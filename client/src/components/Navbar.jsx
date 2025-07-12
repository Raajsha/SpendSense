import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, BarChart3, Home, User, Settings } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              DataViz
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.name} to={item.path}>
                  <motion.div
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-gray-100"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.name} to={item.path} onClick={() => setIsOpen(false)}>
                  <motion.div
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;