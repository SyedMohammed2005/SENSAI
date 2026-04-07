// components/AccordionFeatures.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import * as Icons from 'lucide-react';
import { features } from '@/data/features';

export default function AccordionFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCardClick = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-black overflow-hidden relative">
      {/* Background Grid Lines - Matching other sections */}
      <div className="absolute inset-0 w-full h-full">
        {/* Vertical Grid Lines */}
        <div className="absolute inset-0 w-full h-full" style={{ 
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(200,200,210,0.06) 0px, rgba(200,200,210,0.06) 1px, transparent 1px, transparent 40px)',
          backgroundSize: '40px 100%'
        }} />
        
        {/* Horizontal Grid Lines */}
        <div className="absolute inset-0 w-full h-full" style={{ 
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(200,200,210,0.06) 0px, rgba(200,200,210,0.06) 1px, transparent 1px, transparent 40px)',
          backgroundSize: '100% 40px'
        }} />
        
        {/* Medium Grid Lines */}
        <div className="absolute inset-0 w-full h-full" style={{ 
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(180,180,200,0.04) 0px, rgba(180,180,200,0.04) 1px, transparent 1px, transparent 120px)',
          backgroundSize: '120px 100%'
        }} />
        
        <div className="absolute inset-0 w-full h-full" style={{ 
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(180,180,200,0.04) 0px, rgba(180,180,200,0.04) 1px, transparent 1px, transparent 120px)',
          backgroundSize: '100% 120px'
        }} />
        
        {/* Diagonal Grid Lines */}
        <div className="absolute inset-0 w-full h-full" style={{ 
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(200,200,210,0.03) 0px, rgba(200,200,210,0.03) 1px, transparent 1px, transparent 50px)',
          backgroundSize: '50px 50px'
        }} />

        {/* Dot Pattern */}
        <div className="absolute inset-0 w-full h-full" style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(200,200,210,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header with Scroll Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-3 md:mb-4
            transition-all duration-500 ease-out
            hover:scale-105 hover:-translate-y-3
            bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"
          >
            Powerful Features for your Career Growth
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
            className="max-w-2xl mx-auto px-4"
          >
            <p className="text-gray-400 text-center text-xs sm:text-sm md:text-base">
              Stop guessing and start growing with AI-powered tools designed for modern professionals.
            </p>
          </motion.div>
        </motion.div>

        {/* Mobile View: Vertical Stack - FIXED CENTERING */}
        {isMobile ? (
          <div className="flex justify-center w-full">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
              className="flex flex-col gap-4 w-full max-w-md mx-auto"
            >
              {features.map((feature, index) => {
                const isActive = activeIndex === index;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: false }}
                    onClick={() => handleCardClick(index)}
                    className={`
                      w-full cursor-pointer rounded-2xl overflow-hidden
                      transition-all duration-500 ease-in-out
                      ${isActive 
                        ? 'bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border-2 border-white/20' 
                        : 'bg-gradient-to-br from-gray-900/60 to-gray-900/40 border border-white/10 hover:border-white/20'
                      }
                    `}
                  >
                    {/* Background Image for active card */}
                    {isActive && (
                      <>
                        <div className="absolute inset-0 w-full h-full">
                          <Image
                            src={feature.image}
                            alt={feature.title}
                            fill
                            className="object-cover opacity-20"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                        </div>
                      </>
                    )}

                    {/* Content */}
                    <div className="relative p-4 w-full">
                      {/* Header Section - Always visible */}
                      <div className="flex items-center gap-3 w-full">
                        {/* Icon */}
                        <motion.div
                          className={`
                            rounded-xl bg-gradient-to-r ${feature.color} 
                            flex items-center justify-center shadow-lg
                            ${isActive ? 'w-12 h-12' : 'w-10 h-10'}
                            relative overflow-hidden flex-shrink-0
                          `}
                        >
                          {(() => {
                            const IconComponent = Icons[feature.iconComponent];
                            return IconComponent ? (
                              <IconComponent className={`${isActive ? 'w-6 h-6' : 'w-5 h-5'} text-white relative z-10`} />
                            ) : null;
                          })()}
                        </motion.div>

                        {/* Title and expand indicator */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white text-sm sm:text-base truncate">
                            {feature.title}
                          </h3>
                          {!isActive && (
                            <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">
                              {feature.shortDescription}
                            </p>
                          )}
                        </div>

                        {/* Expand/Collapse Icon */}
                        <motion.div
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-gray-400 flex-shrink-0"
                        >
                          <Icons.ChevronDown className="w-5 h-5" />
                        </motion.div>
                      </div>

                      {/* Expanded Content */}
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 space-y-3 overflow-hidden"
                          >
                            <p className="text-gray-200 text-sm leading-relaxed">
                              {feature.description}
                            </p>

                            <p className="text-gray-400 text-xs leading-relaxed">
                              {feature.longDescription}
                            </p>

                            {/* Stats Grid - 2 columns on mobile */}
                            {feature.stats && feature.stats.length > 0 && (
                              <div className="grid grid-cols-2 gap-2 pt-2">
                                {feature.stats.map((stat, idx) => (
                                  <motion.div 
                                    key={idx} 
                                    className="bg-white/5 backdrop-blur-md rounded-lg p-2 border border-white/10"
                                    whileHover={{ scale: 1.02 }}
                                  >
                                    <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                      {stat.value}
                                    </div>
                                    <div className="text-[10px] text-gray-500">{stat.label}</div>
                                  </motion.div>
                                ))}
                              </div>
                            )}

                            {/* CTA Hint for mobile */}
                            <div className="pt-2 pb-1">
                              <div className="text-center">
                                <span className="text-gray-500 text-[10px] flex items-center justify-center gap-1">
                                  <Icons.Hand className="w-3 h-3" />
                                  <span>Tap to collapse</span>
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        ) : (
          /* Desktop View: Horizontal Accordion with Scroll Animation */
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false }}
            className="flex flex-row gap-6 max-w-7xl mx-auto min-h-[360px]"
          >
            {features.map((feature, index) => {
              const isActive = activeIndex === index;
              const isHovered = hoveredIndex === index;
              
              return (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: false }}
                  onClick={() => handleCardClick(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`
                    relative cursor-pointer rounded-3xl overflow-hidden
                    transition-all duration-500 ease-in-out
                    ${isActive 
                      ? 'md:flex-[5] bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border-2 border-white/20' 
                      : 'md:flex-1 bg-gradient-to-br from-gray-900/60 to-gray-900/40 hover:from-gray-800/60 hover:to-gray-900/60 border border-white/10 hover:border-white/20'
                    }
                  `}
                  style={{
                    minHeight: '336px',
                  }}
                >
                  {/* Animated Background Glow for Capsules - Silver/Grey */}
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 0.1 : 0 }}
                      className="absolute inset-0 bg-gradient-to-r from-gray-400 via-white to-gray-400 rounded-3xl blur-xl"
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Background Image (only visible when expanded) */}
                  {isActive && (
                    <>
                      <div className="absolute inset-0 w-full h-full">
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                      </div>
                    </>
                  )}

                  {/* Content Container */}
                  <div className={`relative h-full p-4 flex flex-col ${!isActive ? 'justify-center items-center' : 'justify-between'}`}>
                    {/* Icon and Title Row - Centered for capsule, top for expanded */}
                    <div className={`flex items-center gap-2 ${!isActive ? 'flex-col text-center' : ''} w-full`}>
                      {/* Animated Icon Circle */}
                      <motion.div
                        layout
                        whileHover={!isActive ? { scale: 1.05, rotate: 5 } : {}}
                        className={`
                          rounded-xl bg-gradient-to-r ${feature.color} 
                          flex items-center justify-center shadow-lg
                          ${isActive ? 'w-10 h-10' : 'w-14 h-14'}
                          ${!isActive ? 'mb-2' : ''}
                          relative overflow-hidden
                        `}
                      >
                        {/* Shine effect on icon */}
                        <motion.div
                          initial={{ x: '-100%' }}
                          animate={{ x: isHovered ? '100%' : '-100%' }}
                          transition={{ duration: 0.6 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                        {(() => {
                          const IconComponent = Icons[feature.iconComponent];
                          return IconComponent ? (
                            <IconComponent className={`${isActive ? 'w-5 h-5' : 'w-7 h-7'} text-white relative z-10`} />
                          ) : null;
                        })()}
                      </motion.div>

                      {/* Title */}
                      <motion.div layout className={`${!isActive ? 'w-full' : 'flex-1'}`}>
                        <motion.h3 
                          layout
                          className={`
                            font-bold text-white
                            ${isActive ? 'text-lg' : 'text-sm'}
                            ${!isActive ? 'mt-1' : ''}
                            tracking-wide
                          `}
                        >
                          {feature.title}
                        </motion.h3>
                        
                        {/* Short Description - Capsule Mode */}
                        {!isActive && (
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-gray-500 text-xs mt-1 hidden md:block"
                          >
                            {feature.shortDescription}
                          </motion.p>
                        )}
                      </motion.div>

                      {/* Expand indicator - Hidden in capsule mode */}
                      {!isActive && (
                        <motion.div 
                          animate={{ 
                            y: isHovered ? [0, 5, 0] : 0,
                            opacity: isHovered ? 1 : 0.5
                          }}
                          transition={{ duration: 0.3, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
                          className="text-gray-400 absolute bottom-3 right-3"
                        >
                          <Icons.ChevronRight className="w-3 h-3" />
                        </motion.div>
                      )}
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="mt-4 space-y-3"
                        >
                          <p className="text-gray-200 text-sm leading-relaxed">
                            {feature.description}
                          </p>

                          <p className="text-gray-400 text-xs leading-relaxed">
                            {feature.longDescription}
                          </p>

                          {/* Stats */}
                          {feature.stats && feature.stats.length > 0 && (
                            <div className="grid grid-cols-2 gap-2 pt-2">
                              {feature.stats.map((stat, idx) => (
                                <motion.div 
                                  key={idx} 
                                  className="bg-white/5 backdrop-blur-md rounded-lg p-2 border border-white/10 hover:border-white/20 transition-all"
                                  whileHover={{ scale: 1.02, y: -2 }}
                                >
                                  <div className="text-lg font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                    {stat.value}
                                  </div>
                                  <div className="text-[10px] text-gray-500">{stat.label}</div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Capsule Hint */}
                    {!isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: isHovered ? 1 : 0.7,
                          y: isHovered ? 0 : 5
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-full px-4"
                      >
                        <div className="text-center">
                          <motion.div 
                            className="text-gray-500 text-[10px] flex items-center justify-center gap-1.5"
                            animate={isHovered ? { gap: '0.5rem' } : { gap: '0.25rem' }}
                          >
                            <motion.div
                              animate={isHovered ? { x: [0, 3, 0] } : {}}
                              transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
                            >
                              <Icons.MousePointer className="w-2.5 h-2.5 text-gray-400" />
                            </motion.div>
                            
                            <span className="bg-gradient-to-r from-gray-400 to-white bg-clip-text text-transparent font-medium">
                              {feature.capsuleHint}
                            </span>
                            
                            <motion.div
                              animate={{ rotate: isHovered ? [0, 90, 0] : 0 }}
                              transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
                            >
                              <Icons.ChevronRight className="w-2.5 h-2.5 text-gray-600" />
                            </motion.div>
                          </motion.div>
                          
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: isHovered ? '30%' : 0 }}
                            className="h-[1px] bg-gradient-to-r from-gray-500 to-transparent mx-auto mt-1 rounded-full"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Corner decorative elements */}
                  {!isActive && isHovered && (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gray-400/50 rounded-tl-2xl"
                      />
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gray-400/50 rounded-tr-2xl"
                      />
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gray-400/50 rounded-bl-2xl"
                      />
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gray-400/50 rounded-br-2xl"
                      />
                    </>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}