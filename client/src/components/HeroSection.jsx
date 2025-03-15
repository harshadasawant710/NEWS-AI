import { Button } from '@mantine/core'
import { Sparkle } from 'lucide-react'
import { motion } from 'framer-motion'
import React from 'react'

const HeroSection = () => {
  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden">
      {/* Background Gradient Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-500 opacity-30"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      />

      {/* Floating Sparkles */}
      <motion.div
        className="absolute top-10 right-10"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      >
        <Sparkle size={48} color="#06b6d4" />
      </motion.div>

      {/* Centered Content */}
      <motion.div
        className="text-center space-y-8 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font-extrabold text-black">
        Your Personalized <span className="text-cyan-500">AI News Companion</span>
        </h1>

        <motion.h2
          className="text-gray-600 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Get real-time breaking news, AI-powered summaries, and personalized recommendations.
          Stay informed with deep insights, trending stories, and expert analysis—all in one place.
        </motion.h2>

        <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative"
    >
      <Button
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 hover:from-purple-500 hover:to-blue-500"
        leftSection={
          <motion.div
            animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Sparkle />
          </motion.div>
        }
      >
        Explore Now
      </Button>
    </motion.div>
      </motion.div>
    </div>
  )
}

export default HeroSection
