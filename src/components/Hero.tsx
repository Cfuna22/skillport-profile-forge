
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Your Skills,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                On-Chain
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Create a decentralized portfolio that showcases your skills, projects, and endorsements. 
              Build your reputation on the blockchain.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/auth"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Create Your On-Chain Portfolio
            </Link>
            
            <Link
              to="/profile/demo"
              className="text-gray-600 px-8 py-4 rounded-lg font-semibold text-lg border border-gray-300 hover:border-gray-400 hover:bg-white transition-all duration-200"
            >
              View Demo Profile
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <ArrowDown className="mx-auto text-gray-400 animate-bounce" size={24} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
