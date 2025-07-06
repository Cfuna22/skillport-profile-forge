
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import TopProfiles from "@/components/TopProfiles";

const Index = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <TopProfiles />
      </motion.div>
    </Layout>
  );
};

export default Index;
