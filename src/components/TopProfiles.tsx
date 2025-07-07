
import { motion } from "framer-motion";
import { useEffect } from "react";
import ProfileCard from "./ProfileCard";
import { useRealTimeProfiles } from "@/hooks/useRealTimeProfiles";
import { Loader2 } from "lucide-react";

const TopProfiles = () => {
  const { profiles, loading, error, fetchTopProfiles } = useRealTimeProfiles();

  useEffect(() => {
    // Fetch top profiles specifically for this component
    fetchTopProfiles();
  }, [fetchTopProfiles]);

  if (loading && profiles.length === 0) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
            <p className="mt-2 text-gray-600">Loading profiles...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error && profiles.length === 0) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-600">Error loading profiles: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  const displayProfiles = profiles.slice(0, 6);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top Portfolios
          </h2>
          <p className="text-lg text-gray-600">
            Discover the most endorsed professionals in our community
          </p>
          {loading && (
            <div className="flex items-center justify-center mt-2">
              <Loader2 className="h-4 w-4 animate-spin text-blue-600 mr-2" />
              <span className="text-sm text-gray-500">Updating...</span>
            </div>
          )}
        </motion.div>

        {displayProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProfiles.map((profile, index) => (
              <motion.div
                key={profile.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProfileCard profile={profile} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No profiles found. Be the first to create one!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopProfiles;
