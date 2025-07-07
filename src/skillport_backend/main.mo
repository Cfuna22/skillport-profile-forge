
import Map "mo:base/HashMap";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Iter "mo:base/Iter";

actor SkillPortBackend {
    // Data Models
    public type Profile = {
        id: Principal;
        name: Text;
        bio: Text;
        skills: [Text];
        projects: [Project];
        endorsements: [Endorsement];
        createdAt: Int;
        lastUpdated: Int;
    };

    public type Project = {
        id: Text;
        title: Text;
        description: Text;
        mediaLink: ?Text;
        createdAt: Int;
    };

    public type Endorsement = {
        id: Text;
        fromPrincipal: Principal;
        fromName: Text;
        skill: Text;
        message: Text;
        timestamp: Int;
    };

    // Stable storage for persistence
    private stable var profileEntries: [(Principal, Profile)] = [];
    private stable var lastUpdateTime: Int = Time.now();
    private var profiles = Map.HashMap<Principal, Profile>(0, Principal.equal, Principal.hash);

    // Initialize from stable storage
    system func preupgrade() {
        profileEntries := Iter.toArray(profiles.entries());
    };

    system func postupgrade() {
        profiles := Map.fromIter<Principal, Profile>(profileEntries.vals(), profileEntries.size(), Principal.equal, Principal.hash);
        profileEntries := [];
    };

    // Helper function to generate unique IDs
    private func generateId(): Text {
        Int.toText(Time.now())
    };

    // Helper function to notify subscribers (updates last update time)
    private func notifySubscribers() {
        lastUpdateTime := Time.now();
    };

    // Public Functions
    public shared(msg) func registerUser(name: Text, bio: Text): async Result.Result<Bool, Text> {
        let caller = msg.caller;
        
        // Check if user already exists
        switch (profiles.get(caller)) {
            case (?existing) { #err("User already registered") };
            case null {
                let newProfile: Profile = {
                    id = caller;
                    name = name;
                    bio = bio;
                    skills = [];
                    projects = [];
                    endorsements = [];
                    createdAt = Time.now();
                    lastUpdated = Time.now();
                };
                profiles.put(caller, newProfile);
                notifySubscribers();
                #ok(true)
            };
        }
    };

    public shared(msg) func updateProfile(name: Text, bio: Text): async Result.Result<Bool, Text> {
        let caller = msg.caller;
        
        switch (profiles.get(caller)) {
            case null { #err("User not found") };
            case (?profile) {
                let updatedProfile: Profile = {
                    id = profile.id;
                    name = name;
                    bio = bio;
                    skills = profile.skills;
                    projects = profile.projects;
                    endorsements = profile.endorsements;
                    createdAt = profile.createdAt;
                    lastUpdated = Time.now();
                };
                profiles.put(caller, updatedProfile);
                notifySubscribers();
                #ok(true)
            };
        }
    };

    public shared(msg) func addSkill(skill: Text): async Result.Result<Bool, Text> {
        let caller = msg.caller;
        
        switch (profiles.get(caller)) {
            case null { #err("User not found") };
            case (?profile) {
                // Check if skill already exists
                let skillExists = Array.find<Text>(profile.skills, func(s) { s == skill });
                switch (skillExists) {
                    case (?existing) { #err("Skill already added") };
                    case null {
                        let newSkills = Array.append<Text>(profile.skills, [skill]);
                        let updatedProfile: Profile = {
                            id = profile.id;
                            name = profile.name;
                            bio = profile.bio;
                            skills = newSkills;
                            projects = profile.projects;
                            endorsements = profile.endorsements;
                            createdAt = profile.createdAt;
                            lastUpdated = Time.now();
                        };
                        profiles.put(caller, updatedProfile);
                        notifySubscribers();
                        #ok(true)
                    };
                }
            };
        }
    };

    public shared(msg) func removeSkill(skill: Text): async Result.Result<Bool, Text> {
        let caller = msg.caller;
        
        switch (profiles.get(caller)) {
            case null { #err("User not found") };
            case (?profile) {
                let newSkills = Array.filter<Text>(profile.skills, func(s) { s != skill });
                let updatedProfile: Profile = {
                    id = profile.id;
                    name = profile.name;
                    bio = profile.bio;
                    skills = newSkills;
                    projects = profile.projects;
                    endorsements = profile.endorsements;
                    createdAt = profile.createdAt;
                    lastUpdated = Time.now();
                };
                profiles.put(caller, updatedProfile);
                notifySubscribers();
                #ok(true)
            };
        }
    };

    public shared(msg) func addProject(title: Text, description: Text, mediaLink: ?Text): async Result.Result<Bool, Text> {
        let caller = msg.caller;
        
        switch (profiles.get(caller)) {
            case null { #err("User not found") };
            case (?profile) {
                let newProject: Project = {
                    id = generateId();
                    title = title;
                    description = description;
                    mediaLink = mediaLink;
                    createdAt = Time.now();
                };
                let newProjects = Array.append<Project>(profile.projects, [newProject]);
                let updatedProfile: Profile = {
                    id = profile.id;
                    name = profile.name;
                    bio = profile.bio;
                    skills = profile.skills;
                    projects = newProjects;
                    endorsements = profile.endorsements;
                    createdAt = profile.createdAt;
                    lastUpdated = Time.now();
                };
                profiles.put(caller, updatedProfile);
                notifySubscribers();
                #ok(true)
            };
        }
    };

    public shared(msg) func endorseUser(targetPrincipal: Principal, skill: Text, message: Text): async Result.Result<Bool, Text> {
        let caller = msg.caller;
        
        // Get endorser's profile for name
        let endorserProfile = profiles.get(caller);
        let endorserName = switch (endorserProfile) {
            case null { "Anonymous" };
            case (?profile) { profile.name };
        };

        // Get target user's profile
        switch (profiles.get(targetPrincipal)) {
            case null { #err("Target user not found") };
            case (?profile) {
                let newEndorsement: Endorsement = {
                    id = generateId();
                    fromPrincipal = caller;
                    fromName = endorserName;
                    skill = skill;
                    message = message;
                    timestamp = Time.now();
                };
                let newEndorsements = Array.append<Endorsement>(profile.endorsements, [newEndorsement]);
                let updatedProfile: Profile = {
                    id = profile.id;
                    name = profile.name;
                    bio = profile.bio;
                    skills = profile.skills;
                    projects = profile.projects;
                    endorsements = newEndorsements;
                    createdAt = profile.createdAt;
                    lastUpdated = Time.now();
                };
                profiles.put(targetPrincipal, updatedProfile);
                notifySubscribers();
                #ok(true)
            };
        }
    };

    // Query Functions
    public query func getProfile(userPrincipal: Principal): async ?Profile {
        profiles.get(userPrincipal)
    };

    public query func getMyProfile(caller: Principal): async ?Profile {
        profiles.get(caller)
    };

    public query func getAllProfiles(): async [Profile] {
        Iter.toArray(profiles.vals())
    };

    public query func listTopProfiles(): async [Profile] {
        let allProfiles = Iter.toArray(profiles.vals());
        // Sort by endorsement count (simple implementation)
        Array.sort<Profile>(allProfiles, func(a, b) {
            if (a.endorsements.size() > b.endorsements.size()) { #less }
            else if (a.endorsements.size() < b.endorsements.size()) { #greater }
            else { #equal }
        })
    };

    public query func searchProfilesBySkill(skill: Text): async [Profile] {
        let allProfiles = Iter.toArray(profiles.vals());
        Array.filter<Profile>(allProfiles, func(profile) {
            Array.find<Text>(profile.skills, func(s) { s == skill }) != null
        })
    };

    // Real-time update timestamp query function
    public query func getLastUpdateTime(): async Int {
        lastUpdateTime
    };

    // Admin/Stats functions
    public query func getTotalUsers(): async Nat {
        profiles.size()
    };
}
