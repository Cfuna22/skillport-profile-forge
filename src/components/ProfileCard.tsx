
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import SkillBadge from "./SkillBadge";
import { Profile } from "@/lib/canisters";

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const displaySkills = profile.skills.slice(0, 3);
  const remainingSkillsCount = profile.skills.length - 3;

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-200 transition-all duration-200"
    >
      <Link to={`/profile/${profile.id.toString()}`}>
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <User className="text-white" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-sm text-gray-500">{profile.endorsements.length} endorsements</p>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{profile.bio}</p>

        <div className="flex flex-wrap gap-2">
          {displaySkills.map((skill) => (
            <SkillBadge key={skill} skill={skill} size="sm" />
          ))}
          {remainingSkillsCount > 0 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{remainingSkillsCount} more
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProfileCard;
