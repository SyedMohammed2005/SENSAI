"use client";

import { motion } from "framer-motion";
import { 
  ChevronRight, 
  Clock, 
  BookOpen, 
  Wrench, 
  FolderKanban, 
  Link2,
  Target,
  Sparkles,
  Award
} from "lucide-react";
import { useState } from "react";

export default function RoadmapFlow({ roadmap }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", damping: 15, stiffness: 100 }
    }
  };

  const stages = roadmap?.stages || roadmap?.steps || [];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto relative py-8"
    >
      {/* Animated Vertical Line with Pulse Effect */}
      <div className="absolute left-[27px] md:left-[35px] top-12 bottom-12 w-0.5 bg-gradient-to-b from-gray-600 via-gray-500 to-gray-600 rounded-full">
        <motion.div
          className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-400 to-transparent"
          animate={{ y: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {stages.map((stage, index) => {
        const isHovered = hoveredIndex === index;
        
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className="relative pl-12 md:pl-16 mb-8 last:mb-0 group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Connecting Line from Circle to Card */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="absolute left-[35px] md:left-[43px] top-6 w-6 h-0.5 bg-gradient-to-r from-gray-500 to-gray-400 origin-left"
            />

            {/* Step Circle with Number and Animation */}
            <motion.div
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="absolute left-0 top-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 
                border-2 border-white/20 flex items-center justify-center shadow-lg z-10
                group-hover:border-white/40 transition-all duration-300"
            >
              <span className="text-white font-bold text-sm md:text-base">
                {String(index + 1).padStart(2, '0')}
              </span>
            </motion.div>

            {/* Card Container with Hover Effects */}
            <motion.div
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className={`relative rounded-2xl overflow-hidden transition-all duration-500
                bg-gradient-to-br from-gray-900/80 to-gray-900/40
                border border-white/10 hover:border-white/30
                hover:shadow-2xl hover:shadow-gray-500/10
                backdrop-blur-sm cursor-pointer`}
            >
              {/* Animated Gradient Overlay on Hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gray-700/20 to-gray-900/40 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              {/* Shine Effect on Hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              />

              {/* Card Content */}
              <div className="relative p-5 md:p-6">
                
                {/* Header Section with Title and Duration */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div className="flex-1">
                    <motion.h2 
                      whileHover={{ x: 5 }}
                      className="text-lg md:text-xl font-bold text-white group-hover:text-gray-200 transition-colors duration-300"
                    >
                      {stage.stage || stage.title}
                    </motion.h2>
                    
                    {/* Duration Badge */}
                    {stage.duration && (
                      <div className="flex items-center gap-1 mt-2">
                        <Clock className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">{stage.duration}</span>
                      </div>
                    )}
                  </div>

                  {/* Step Indicator Badge */}
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-white/10">
                    <span className="text-xs text-gray-400">Step {index + 1}</span>
                  </div>
                </div>

                {/* Description */}
                {stage.description && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300"
                  >
                    {stage.description}
                  </motion.p>
                )}

                {/* Topics Section */}
                {stage.topics && stage.topics.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-4"
                  >
                    <h3 className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-2">
                      <BookOpen className="w-3 h-3" />
                      TOPICS COVERED
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {stage.topics.map((topic, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300
                            hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        >
                          {topic}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Skills Section */}
                {stage.skills && stage.skills.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4"
                  >
                    <h3 className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-2">
                      <Wrench className="w-3 h-3" />
                      SKILLS YOU'LL GAIN
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {stage.skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className="px-2 py-1 rounded-md bg-gradient-to-r from-blue-600/20 to-purple-600/20 
                            border border-blue-500/20 text-xs text-blue-300
                            hover:border-blue-500/40 transition-all duration-300"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Projects Section */}
                {stage.projects && stage.projects.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-4"
                  >
                    <h3 className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-2">
                      <FolderKanban className="w-3 h-3" />
                      PROJECTS TO BUILD
                    </h3>
                    <div className="space-y-1">
                      {stage.projects.map((project, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-2 text-gray-400 text-sm group/project"
                        >
                          <ChevronRight className="w-3 h-3 mt-0.5 text-gray-500 group-hover/project:text-gray-300 transition-colors" />
                          <span className="group-hover/project:text-gray-300 transition-colors">{project}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Resources Section */}
                {stage.resources && stage.resources.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-4"
                  >
                    <h3 className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-2">
                      <Link2 className="w-3 h-3" />
                      RECOMMENDED RESOURCES
                    </h3>
                    <div className="space-y-1">
                      {stage.resources.map((resource, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-2 text-gray-400 text-sm group/resource"
                        >
                          <div className="w-1 h-1 rounded-full bg-gray-500 mt-1.5" />
                          <span className="group-hover/resource:text-gray-300 transition-colors">{resource}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Outcome Section */}
                {stage.outcome && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 p-3 rounded-xl bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20"
                  >
                    <h3 className="text-xs font-semibold text-green-400 mb-1 flex items-center gap-2">
                      <Award className="w-3 h-3" />
                      LEARNING OUTCOME
                    </h3>
                    <p className="text-sm text-green-300/80">
                      {stage.outcome}
                    </p>
                  </motion.div>
                )}

                {/* Progress Indicator on Hover */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gray-400 to-white rounded-full
                    group-hover:w-full transition-all duration-500"
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                />

                {/* Floating Particles on Hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl hidden md:block"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-gray-400 rounded-full"
                      initial={{ 
                        x: "50%", 
                        y: "50%",
                        scale: 0
                      }}
                      animate={{
                        x: ["50%", `${Math.random() * 100}%`],
                        y: ["50%", `${Math.random() * 100}%`],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Connecting Arrow between stages (except last) */}
            {index < stages.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="absolute left-[22px] md:left-[30px] -bottom-4 z-20"
              >
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-gray-600 to-gray-400 
                    flex items-center justify-center shadow-lg">
                    <ChevronRight className="w-3 h-3 text-black" />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}