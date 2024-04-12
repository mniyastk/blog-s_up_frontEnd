import React from "react";
import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 40, y: -30 },
  animate: { opacity: 100, y: 0 },
  exit: { opacity: 80, y: 30},
};

const Animation = ({ children }) => {
  return (
    <>
      <motion.div
        variants={animations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{duration:.5}}
      >
        {children}
      </motion.div>
    </>
  );
};

export default Animation;
