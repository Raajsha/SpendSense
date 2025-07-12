import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Camera, Save, X } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'January 2023',
    bio: 'Data enthusiast with a passion for turning complex information into actionable insights. Love working with cutting-edge analytics tools.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const stats = [
    { label: 'Reports Created', value: '127' },
    { label: 'Data Points Analyzed', value: '2.4M' },
    { label: 'Dashboards', value: '23' },
    { label: 'Team Members', value: '8' }
  ];

  const recentActivity = [
    { action: 'Created new dashboard', time: '2 hours ago', type: 'create' },
    { action: 'Updated revenue report', time: '5 hours ago', type: 'update' },
    { action: 'Shared analytics with team', time: '1 day ago', type: 'share' },
    { action: 'Exported monthly data', time: '2 days ago', type: 'export' },
    { action: 'Created user segment', time: '3 days ago', type: 'create' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Cover Image */}
            <div className="h-32 bg-gradient-to-r from-primary-500 to-accent-500 relative">
              <div className="absolute inset-0 bg-black/20"></div>
              {!isEditing && (
                <motion.button
                  onClick={() => setIsEditing(true)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit3 className="w-4 h-4" />
                </motion.button>
              )}
            </div>

            <div className="p-6">
              {/* Avatar and Basic Info */}
              <div className="flex items-start space-x-4 -mt-16 mb-6">
                <div className="relative">
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  {isEditing && (
                    <motion.button
                      className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full shadow-lg hover:bg-primary-700"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Camera className="w-3 h-3" />
                    </motion.button>
                  )}
                </div>

                <div className="flex-1 mt-12">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                      className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-primary-500 focus:outline-none w-full"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                  )}
                  <p className="text-gray-600 mt-1">Data Analyst</p>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                {isEditing ? (
                  <textarea
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <span className="text-gray-600">{profile.email}</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <span className="text-gray-600">{profile.phone}</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.location}
                        onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <span className="text-gray-600">{profile.location}</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">Joined {profile.joinDate}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <motion.div
                  className="flex space-x-3 mt-6 pt-6 border-t border-gray-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.button
                    onClick={handleSave}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-400"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="flex justify-between items-center"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <span className="text-gray-600">{stat.label}</span>
                    <span className="font-semibold text-gray-900">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'create' ? 'bg-green-500' :
                      activity.type === 'update' ? 'bg-blue-500' :
                      activity.type === 'share' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;