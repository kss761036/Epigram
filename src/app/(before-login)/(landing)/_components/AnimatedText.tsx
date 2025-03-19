'use client';

import { motion } from 'motion/react';
import React from 'react';

interface AnimatedTextProps {
  text: string;
  text2: string;
}

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const charVariants = {
  initial: { opacity: 0.1 },
  animate: { opacity: 1, transition: { duration: 1 } },
};
const charVariants2 = {
  initial: { opacity: 0.1 },
  animate: { opacity: 1, transition: { duration: 1 } },
};

export default function AnimatedText({ text, text2 }: AnimatedTextProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial='initial'
      animate='animate'
      className='inline-block'
    >
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={charVariants}>
          {char}
        </motion.span>
      ))}
      <br />
      {text2.split('').map((char, index) => (
        <motion.span key={index} variants={charVariants2}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
