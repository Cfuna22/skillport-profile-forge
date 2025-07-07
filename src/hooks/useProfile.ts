
import { useState, useEffect } from 'react';
import { Principal } from '@dfinity/principal';
import { useAuth } from '@/contexts/AuthContext';
import { Profile, getActor, createActor, handleResult, isOk } from '@/lib/canisters';
import { useToast } from '@/hooks/use-toast';

export const useProfile = () => {
  const { isAuthenticated, principal } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && principal) {
      loadProfile();
    }
  }, [isAuthenticated, principal]);

  const loadProfile = async () => {
    if (!principal) return;

    try {
      setLoading(true);
      setError(null);
      
      const actor = await createActor();
      const userPrincipal = Principal.fromText(principal);
      const profileData = await actor.getProfile(userPrincipal);
      
      setProfile(profileData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load profile';
      setError(errorMessage);
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (name: string, bio: string): Promise<boolean> => {
    try {
      setLoading(true);
      const actor = await createActor();
      const result = await actor.registerUser(name, bio);
      
      if (isOk(result)) {
        toast({
          title: "Success",
          description: "Profile created successfully!",
        });
        await loadProfile(); // Reload profile after registration
        return true;
      } else {
        throw new Error(result.err);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to register user';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (name: string, bio: string): Promise<boolean> => {
    try {
      setLoading(true);
      const actor = await createActor();
      const result = await actor.updateProfile(name, bio);
      
      if (isOk(result)) {
        toast({
          title: "Success",
          description: "Profile updated successfully!",
        });
        await loadProfile();
        return true;
      } else {
        throw new Error(result.err);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async (skill: string): Promise<boolean> => {
    try {
      const actor = await createActor();
      const result = await actor.addSkill(skill);
      
      if (isOk(result)) {
        toast({
          title: "Success",
          description: `Added skill: ${skill}`,
        });
        await loadProfile();
        return true;
      } else {
        throw new Error(result.err);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add skill';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    }
  };

  const removeSkill = async (skill: string): Promise<boolean> => {
    try {
      const actor = await createActor();
      const result = await actor.removeSkill(skill);
      
      if (isOk(result)) {
        toast({
          title: "Success",
          description: `Removed skill: ${skill}`,
        });
        await loadProfile();
        return true;
      } else {
        throw new Error(result.err);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove skill';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    }
  };

  const addProject = async (title: string, description: string, mediaLink?: string): Promise<boolean> => {
    try {
      const actor = await createActor();
      const result = await actor.addProject(title, description, mediaLink || null);
      
      if (isOk(result)) {
        toast({
          title: "Success",
          description: "Project added successfully!",
        });
        await loadProfile();
        return true;
      } else {
        throw new Error(result.err);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add project';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    }
  };

  const endorseUser = async (targetPrincipal: string, skill: string, message: string): Promise<boolean> => {
    try {
      const actor = await createActor();
      const target = Principal.fromText(targetPrincipal);
      const result = await actor.endorseUser(target, skill, message);
      
      if (isOk(result)) {
        toast({
          title: "Success",
          description: "Endorsement submitted successfully!",
        });
        return true;
      } else {
        throw new Error(result.err);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit endorsement';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    profile,
    loading,
    error,
    registerUser,
    updateProfile,
    addSkill,
    removeSkill,
    addProject,
    endorseUser,
    refetch: loadProfile,
  };
};
