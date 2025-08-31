import { motion } from "framer-motion";
import React from "react";

const AnimatedDiv = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedDiv;
