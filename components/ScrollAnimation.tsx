// components/ScrollAnimation.tsx
'use client'; // Client Component としてマーク (Next.js 13+ App Routerの場合)

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScrollAnimationProps {
  children: React.ReactNode;
  variant?: 'fadeInUp' | 'fadeIn' | 'scaleIn'; // アニメーションの種類
  delay?: number; // アニメーションの遅延秒数
  duration?: number; // アニメーションの時間
}

const variants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
};

export default function ScrollAnimation({
  children,
  variant = 'fadeInUp', // デフォルトはfadeInUp
  delay = 0,
  duration = 0.6,
}: ScrollAnimationProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // 一度だけトリガー
    threshold: 0.1,    // 10%要素が見えたら発動
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants[variant]}
      transition={{ duration: duration, delay: delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}