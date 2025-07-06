
import { motion } from "framer-motion";
import ProfileCard from "./ProfileCard";
import { dummyProfiles } from "@/utils/dummyData";

const TopProfiles = () => {
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyProfiles.slice(0, 6).map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProfileCard profile={profile} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopProfiles;
