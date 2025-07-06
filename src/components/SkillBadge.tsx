
interface SkillBadgeProps {
  skill: string;
  size?: "sm" | "md";
}

const SkillBadge = ({ skill, size = "md" }: SkillBadgeProps) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm"
  };

  return (
    <span className={`bg-blue-100 text-blue-700 rounded-full font-medium ${sizeClasses[size]}`}>
      {skill}
    </span>
  );
};

export default SkillBadge;
