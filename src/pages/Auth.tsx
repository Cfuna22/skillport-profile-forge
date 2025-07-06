
import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const Auth = () => {
  const handleLogin = () => {
    // Mock login - replace with Internet Identity integration
    const mockUser = {
      id: "user-1",
      name: "Demo User",
      bio: "This is a demo user account"
    };
    localStorage.setItem("skillport_user", JSON.stringify(mockUser));
    window.location.href = "/dashboard";
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to SkillPort</h1>
              <p className="text-gray-600">Sign in with your Internet Identity to get started</p>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Login with Internet Identity
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Auth;
