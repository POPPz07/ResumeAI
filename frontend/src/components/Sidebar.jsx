import React from 'react';
import { Home, Briefcase, Settings, LogOut, User } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { mockUser } from '../mock';

const Sidebar = ({ activeView, setActiveView }) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'jobs', label: 'Job Postings', icon: Briefcase },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-blue-400">TrueView</h1>
        <p className="text-sm text-slate-400 mt-1">AI Resume Screening</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <Button
                  variant={activeView === item.id ? "secondary" : "ghost"}
                  className={`w-full justify-start text-left transition-all duration-200 ${
                    activeView === item.id 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                  onClick={() => setActiveView(item.id)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{mockUser.name}</p>
            <p className="text-xs text-slate-400">{mockUser.role}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 transition-colors duration-200"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;