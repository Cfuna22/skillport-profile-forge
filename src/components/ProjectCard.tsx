
import { motion } from "framer-motion";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-200 transition-all duration-200"
    >
      <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{project.description}</p>
      {project.mediaLink && (
        <a
          href={project.mediaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          View Project →
        </a>
      )}
    </motion.div>
  );
};

export default ProjectCard;
