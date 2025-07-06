
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Share } from "lucide-react";
import Layout from "@/components/Layout";
import SkillBadge from "@/components/SkillBadge";
import ProjectCard from "@/components/ProjectCard";
import { Profile } from "@/types";
import { dummyProfiles } from "@/utils/dummyData";

const PublicProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showEndorseForm, setShowEndorseForm] = useState(false);
  const [endorseData, setEndorseData] = useState({ skill: "", message: "" });

  useEffect(() => {
    // Find profile by ID (in real app, this would be an API call)
    const foundProfile = dummyProfiles.find(p => p.id === id);
    if (foundProfile) {
      setProfile(foundProfile);
    }
  }, [id]);

  const handleEndorse = () => {
    if (endorseData.skill && endorseData.message && profile) {
      // In real app, this would send to backend
      console.log("Endorsement submitted:", endorseData);
      setShowEndorseForm(false);
      setEndorseData({ skill: "", message: "" });
      // Show success message
      alert("Endorsement submitted successfully!");
    }
  };

  if (!profile) {
    return <Layout><div className="text-center py-20">Profile not found</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl p-8 border border-gray-200"
        >
          {/* Profile Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
                <p className="text-gray-600 mb-2">{profile.bio}</p>
                <p className="text-sm text-gray-500">{profile.endorsements.length} endorsements</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Share size={18} />
                <span>Share</span>
              </button>
              <button
                onClick={() => setShowEndorseForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Endorse User
              </button>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <SkillBadge key={skill} skill={skill} />
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects</h2>
            {profile.projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No projects shared yet.</p>
            )}
          </div>

          {/* Endorsements */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Endorsements</h2>
            {profile.endorsements.length > 0 ? (
              <div className="space-y-4">
                {profile.endorsements.map((endorsement, index) => (
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
              <p className="text-gray-500 text-center py-8">No endorsements yet.</p>
            )}
          </div>
        </motion.div>

        {/* Endorse Form Modal */}
        {showEndorseForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Endorse {profile.name}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skill to endorse
                  </label>
                  <select
                    value={endorseData.skill}
                    onChange={(e) => setEndorseData({...endorseData, skill: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a skill</option>
                    {profile.skills.map((skill) => (
                      <option key={skill} value={skill}>{skill}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Endorsement message
                  </label>
                  <textarea
                    value={endorseData.message}
                    onChange={(e) => setEndorseData({...endorseData, message: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Write your endorsement..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowEndorseForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEndorse}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Endorsement
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PublicProfile;
