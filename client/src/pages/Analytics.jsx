import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Calendar, Filter, Download, RefreshCw, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import CountUp from 'react-countup';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sample data - in real app this would come from API
  const [data, setData] = useState({
    revenue: [
      { name: 'Mon', value: 4000, users: 240 },
      { name: 'Tue', value: 3000, users: 139 },
      { name: 'Wed', value: 2000, users: 980 },
      { name: 'Thu', value: 2780, users: 390 },
      { name: 'Fri', value: 1890, users: 480 },
      { name: 'Sat', value: 2390, users: 380 },
      { name: 'Sun', value: 3490, users: 430 },
    ],
    traffic: [
      { name: 'Jan', desktop: 4000, mobile: 2400, tablet: 1200 },
      { name: 'Feb', desktop: 3000, mobile: 1398, tablet: 800 },
      { name: 'Mar', desktop: 2000, mobile: 9800, tablet: 1500 },
      { name: 'Apr', desktop: 2780, mobile: 3908, tablet: 1200 },
      { name: 'May', desktop: 1890, mobile: 4800, tablet: 900 },
      { name: 'Jun', desktop: 2390, mobile: 3800, tablet: 1100 },
    ],
    demographics: [
      { name: '18-24', value: 400, color: '#0ea5e9' },
      { name: '25-34', value: 300, color: '#3b82f6' },
      { name: '35-44', value: 300, color: '#6366f1' },
      { name: '45-54', value: 200, color: '#8b5cf6' },
      { name: '55+', value: 150, color: '#d946ef' },
    ]
  });

  const kpis = [
    {
      title: 'Total Revenue',
      value: 45231,
      change: '+12.5%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      prefix: '$'
    },
    {
      title: 'Active Users',
      value: 12847,
      change: '+8.2%',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      prefix: ''
    },
    {
      title: 'Conversion Rate',
      value: 3.24,
      change: '+0.8%',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      prefix: '',
      suffix: '%'
    },
    {
      title: 'Avg. Session',
      value: 4.32,
      change: '-2.1%',
      icon: Activity,
      color: 'from-orange-500 to-red-500',
      prefix: '',
      suffix: 'm'
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      // Update data with random variations
      setData(prev => ({
        ...prev,
        revenue: prev.revenue.map(item => ({
          ...item,
          value: item.value + Math.floor(Math.random() * 1000) - 500
        }))
      }));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
              <p className="text-gray-600">Real-time insights and performance metrics</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              {/* Time Range Filter */}
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>

              {/* Refresh Button */}
              <motion.button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </motion.button>

              {/* Export Button */}
              <motion.button
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${kpi.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium ${
                    kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.change}
                  </span>
                </div>
                
                <h3 className="text-gray-600 text-sm font-medium mb-1">{kpi.title}</h3>
                <div className="text-2xl font-bold text-gray-900">
                  {kpi.prefix}
                  <CountUp
                    end={kpi.value}
                    duration={2}
                    separator=","
                    decimals={kpi.suffix === '%' || kpi.suffix === 'm' ? 2 : 0}
                  />
                  {kpi.suffix}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Revenue</span>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.revenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Traffic Sources */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h3>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.traffic}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="desktop" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mobile" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="tablet" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Demographics Pie Chart */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">User Demographics</h3>
            
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data.demographics}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.demographics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* User Activity */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">User Activity</h3>
            
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data.revenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#d946ef"
                  strokeWidth={3}
                  dot={{ fill: '#d946ef', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Stats</h3>
            
            <div className="space-y-4">
              {[
                { label: 'Page Views', value: '1.2M', change: '+15%' },
                { label: 'Bounce Rate', value: '32%', change: '-5%' },
                { label: 'Avg. Duration', value: '3:24', change: '+12%' },
                { label: 'New Visitors', value: '68%', change: '+8%' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                >
                  <span className="text-gray-600 font-medium">{stat.label}</span>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{stat.value}</div>
                    <div className={`text-xs ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;