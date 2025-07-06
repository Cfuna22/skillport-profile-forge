
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Share, Plus, Edit } from "lucide-react";
import Layout from "@/components/Layout";
import SkillBadge from "@/components/SkillBadge";
import ProjectCard from "@/components/ProjectCard";
import AddProjectModal from "@/components/AddProjectModal";
import { Profile, Project } from "@/types";

const Dashboard = () => {
  const [user, setUser] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [showAddProject, setShowAddProject] = useState(false);

  useEffect(() => {
    // Load user from localStorage - replace with real auth
    const savedUser = localStorage.getItem("skillport_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      // Mock complete profile data
      setUser({
        id: userData.id,
        name: userData.name,
        bio: userData.bio || "Add your bio here...",
        skills: userData.skills || ["React", "TypeScript", "Node.js"],
        projects: userData.projects || [],
        endorsements: userData.endorsements || []
      });
    }
  }, []);

  const addSkill = () => {
    if (newSkill.trim() && user) {
      const updatedUser = {
        ...user,
        skills: [...user.skills, newSkill.trim()]
      };
      setUser(updatedUser);
      localStorage.setItem("skillport_user", JSON.stringify(updatedUser));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        skills: user.skills.filter(skill => skill !== skillToRemove)
      };
      setUser(updatedUser);
      localStorage.setItem("skillport_user", JSON.stringify(updatedUser));
    }
  };

  const updateProfile = (field: string, value: string) => {
    if (user) {
      const updatedUser = { ...user, [field]: value };
      setUser(updatedUser);
      localStorage.setItem("skillport_user", JSON.stringify(updatedUser));
    }
  };

  const addProject = (projectData: Omit<Project, 'id'>) => {
    if (user) {
      const newProject: Project = {
        id: Date.now().toString(), // Simple ID generation
        ...projectData
      };
      const updatedUser = {
        ...user,
        projects: [...user.projects, newProject]
      };
      setUser(updatedUser);
      localStorage.setItem("skillport_user", JSON.stringify(updatedUser));
    }
  };

  if (!user) {
    return <Layout><div>Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl p-8 border border-gray-200 mb-8"
        >
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Portfolio</h1>
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Share size={18} />
              <span>Share Public Portfolio</span>
            </button>
          </div>

          {/* Profile Info */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
              >
                <Edit size={16} />
                <span>{isEditing ? "Save" : "Edit"}</span>
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => updateProfile("name", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
                <textarea
                  value={user.bio}
                  onChange={(e) => updateProfile("bio", e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about yourself..."
                />
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{user.name}</h3>
                <p className="text-gray-600">{user.bio}</p>
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {user.skills.map((skill) => (
                <div key={skill} className="relative group">
                  <SkillBadge skill={skill} />
                  <button
                    onClick={() => removeSkill(skill)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSkill()}
                placeholder="Add a skill..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={addSkill}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Projects */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
              <button
                onClick={() => setShowAddProject(true)}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
              >
                <Plus size={16} />
                <span>Add Project</span>
              </button>
            </div>

            {user.projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No projects added yet. Share your work!</p>
            )}
          </div>

          {/* Endorsements */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Endorsements Received</h2>
            {user.endorsements.length > 0 ? (
              <div className="space-y-4">
                {user.endorsements.map((endorsement, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <SkillBadge skill={endorsement.skill} size="sm" />
                      <span className="text-sm text-gray-500">{endorsement.endorser}</span>
                    </div>
                    <p className="text-gray-700">{endorsement.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No endorsements yet. Share your profile to get endorsed!</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={showAddProject}
        onClose={() => setShowAddProject(false)}
        onAddProject={addProject}
      />
    </Layout>
  );
};

export default Dashboard;
