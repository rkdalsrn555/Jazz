import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const FadeInOut = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FadeInOut;
