import { motion } from 'framer-motion';

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 flex items-center justify-center z-50">
      <div className="relative">
        {/* Outer rotating ring */}
        <motion.div
          className="w-32 h-32 border-4 border-transparent border-t-white border-r-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner pulsing circle */}
        <motion.div
          className="absolute inset-4 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full"
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute inset-12 bg-white rounded-full shadow-lg"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: '0 0',
            }}
            animate={{
              rotate: [0, 360],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            initial={{
              x: Math.cos((i * 60) * Math.PI / 180) * 60,
              y: Math.sin((i * 60) * Math.PI / 180) * 60,
            }}
          />
        ))}
      </div>
      
      {/* Loading text */}
      <motion.div
        className="absolute bottom-1/3 text-white text-xl font-light tracking-wider"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Loading Experience...
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;