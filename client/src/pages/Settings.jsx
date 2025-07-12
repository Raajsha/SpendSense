import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, Shield, Palette, Globe, Moon, Sun, Monitor,
  Mail, Smartphone, Lock, Eye, EyeOff, Save
} from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'system',
    notifications: {
      email: true,
      push: false,
      sms: false,
      marketing: true
    },
    privacy: {
      profileVisible: true,
      activityVisible: false,
      dataSharing: false
    },
    security: {
      twoFactor: false,
      sessionTimeout: '30'
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
  };

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor }
  ];

  const settingSections = [
    {
      title: 'Appearance',
      icon: Palette,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <motion.button
                    key={option.value}
                    onClick={() => setSettings(prev => ({ ...prev, theme: option.value }))}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      settings.theme === option.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-5 h-5 mx-auto mb-2" />
                    <span className="text-sm font-medium">{option.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Notifications',
      icon: Bell,
      content: (
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Email notifications', icon: Mail },
            { key: 'push', label: 'Push notifications', icon: Bell },
            { key: 'sms', label: 'SMS notifications', icon: Smartphone },
            { key: 'marketing', label: 'Marketing emails', icon: Mail }
          ].map((notification) => {
            const Icon = notification.icon;
            return (
              <div key={notification.key} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{notification.label}</span>
                </div>
                <motion.button
                  onClick={() => handleSettingChange('notifications', notification.key, !settings.notifications[notification.key])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.notifications[notification.key] ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform"
                    animate={{
                      x: settings.notifications[notification.key] ? 24 : 4
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>
            );
          })}
        </div>
      )
    },
    {
      title: 'Privacy',
      icon: Shield,
      content: (
        <div className="space-y-4">
          {[
            { key: 'profileVisible', label: 'Make profile visible to others' },
            { key: 'activityVisible', label: 'Show activity status' },
            { key: 'dataSharing', label: 'Allow data sharing for analytics' }
          ].map((privacy) => (
            <div key={privacy.key} className="flex items-center justify-between">
              <span className="text-gray-700">{privacy.label}</span>
              <motion.button
                onClick={() => handleSettingChange('privacy', privacy.key, !settings.privacy[privacy.key])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.privacy[privacy.key] ? 'bg-primary-600' : 'bg-gray-200'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform"
                  animate={{
                    x: settings.privacy[privacy.key] ? 24 : 4
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          ))}
        </div>
      )
    },
    {
      title: 'Security',
      icon: Lock,
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-700 font-medium">Two-factor authentication</span>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <motion.button
              onClick={() => handleSettingChange('security', 'twoFactor', !settings.security.twoFactor)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.security.twoFactor ? 'bg-primary-600' : 'bg-gray-200'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform"
                animate={{
                  x: settings.security.twoFactor ? 24 : 4
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session timeout (minutes)
            </label>
            <select
              value={settings.security.sessionTimeout}
              onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </select>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">Change Password</h4>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Current password"
                  value={passwords.current}
                  onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="New password"
                value={passwords.new}
                onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm new password"
                value={passwords.confirm}
                onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )
    }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and security settings</p>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                  </div>
                </div>
                
                <div className="p-6">
                  {section.content}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Save Button */}
        <motion.div
          className="mt-8 flex justify-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.button
            onClick={handleSave}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-primary-700 shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save className="w-5 h-5" />
            <span>Save All Changes</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;