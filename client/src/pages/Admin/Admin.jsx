import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import AdminAnalytics from './AdminAnalytics';
import {
  BarChart3,
  Users,
  Settings,
  Home,
} from 'lucide-react';

const Admin = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path.includes('users')) return 'users';
    if (path.includes('analytics')) return 'analytics';
    if (path.includes('settings')) return 'settings';
    return 'dashboard';
  });

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, component: AdminDashboard },
    { id: 'users', label: 'User Management', icon: Users, component: UserManagement },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, component: AdminAnalytics },
    { id: 'settings', label: 'Settings', icon: Settings, component: () => <div>Settings coming soon...</div> },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || AdminDashboard;

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default Admin;