'use client';

import { motion } from 'framer-motion';
import AnimatedFeatureCard from './AnimatedFeatureCard';
import { features } from '@/data/features';

export default function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-3
            bg-gradient-to-r from-white via-gray-300 to-gray-500 
            bg-clip-text text-transparent
            hover:scale-105 inline-block cursor-pointer transition-all duration-500">
            Powerful Features for Your Career Growth
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto mt-3">
            Everything you need to accelerate your career journey with cutting-edge AI technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <AnimatedFeatureCard
              key={index}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}