import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Globe, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Real-time Analytics',
      description: 'Monitor your data with live updates and interactive charts',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance for instant data visualization',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Worldwide infrastructure for seamless data processing',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '2.4M+', suffix: '' },
    { label: 'Data Points', value: '15.7B+', suffix: '' },
    { label: 'Uptime', value: '99.9', suffix: '%' },
    { label: 'Countries', value: '150', suffix: '+' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary-600 via-accent-600 to-primary-800 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Data Visualization
              <br />
              <span className="text-4xl md:text-6xl">Reimagined</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transform your raw data into stunning, interactive visualizations that drive insights and accelerate decision-making.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/analytics">
                <motion.button
                  className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Explore Analytics</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <motion.button
                className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-50 transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <div className="relative mt-20">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full opacity-20"
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.sin(i) * 10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 2) * 20}%`,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-primary-600 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {stat.value}{stat.suffix}
                </motion.div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to turn data into actionable insights
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of companies already using our platform to make data-driven decisions.
            </p>
            
            <Link to="/analytics">
              <motion.button
                className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;