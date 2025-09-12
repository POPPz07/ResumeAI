import React, { useState } from 'react';
import { User, Mail, Bell, Activity, Camera, Key, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { mockUser } from '../mock';
import { useToast } from '../hooks/use-toast';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: mockUser.name,
    role: mockUser.role,
    email: mockUser.email,
    avatar: mockUser.avatar
  });
  
  const [notifications, setNotifications] = useState({
    emailScreeningComplete: true,
    inAppNewApplications: true,
    emailWeeklyReport: false,
    inAppJobPostingUpdates: true,
    emailCandidateShortlisted: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Mock recent activity data
  const recentActivity = [
    { id: 1, action: "Uploaded 5 resumes for Senior Backend Engineer", timestamp: "2 hours ago" },
    { id: 2, action: "Created new job posting: Product Manager", timestamp: "1 day ago" },
    { id: 3, action: "Shortlisted 3 candidates for Frontend React Developer", timestamp: "2 days ago" },
    { id: 4, action: "Updated job description for DevOps Engineer", timestamp: "3 days ago" },
    { id: 5, action: "Rejected 8 candidates for UX/UI Designer", timestamp: "5 days ago" }
  ];

  const handleSavePersonalInfo = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Profile updated successfully",
        description: "Your personal information has been saved."
      });
    }, 1000);
  };

  const handleSaveNotifications = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Notification preferences saved",
        description: "Your notification settings have been updated."
      });
    }, 1000);
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirm password don't match.",
        variant: "destructive"
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsPasswordModalOpen(false);
      toast({
        title: "Password changed successfully",
        description: "Your password has been updated."
      });
    }, 1000);
  };

  const handlePhotoUpload = () => {
    // Simulate photo upload
    toast({
      title: "Photo upload",
      description: "Photo upload functionality will be available soon."
    });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
        <p className="text-slate-600 mt-1">Manage your personal information and preferences</p>
      </div>

      <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Personal Info & Security */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-slate-900 mb-2">Profile Picture</p>
                  <Button variant="outline" size="sm" onClick={handlePhotoUpload}>
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Name & Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Job Title</Label>
                  <Input
                    id="role"
                    value={userInfo.role}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, role: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>

              <Button onClick={handleSavePersonalInfo} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Account Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="h-5 w-5" />
                <span>Account Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Email Address</Label>
                <div className="flex items-center space-x-3 mt-1">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-900">{userInfo.email}</span>
                  <span className="text-xs text-slate-500">(read-only)</span>
                </div>
              </div>

              <Separator />

              <div>
                <Label>Password</Label>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-slate-600">••••••••••••</span>
                  <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Change Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="mt-1"
                          />
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                          <Button variant="outline" onClick={() => setIsPasswordModalOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleChangePassword} disabled={isSaving}>
                            {isSaving ? 'Updating...' : 'Update Password'}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Email me when screening is complete</p>
                    <p className="text-xs text-slate-500">Get notified when AI screening finishes</p>
                  </div>
                  <Switch
                    checked={notifications.emailScreeningComplete}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailScreeningComplete: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">In-app notifications for new applications</p>
                    <p className="text-xs text-slate-500">Show notifications when candidates apply</p>
                  </div>
                  <Switch
                    checked={notifications.inAppNewApplications}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, inAppNewApplications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Weekly email reports</p>
                    <p className="text-xs text-slate-500">Receive weekly summary of activities</p>
                  </div>
                  <Switch
                    checked={notifications.emailWeeklyReport}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailWeeklyReport: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Job posting updates</p>
                    <p className="text-xs text-slate-500">Get notified about changes to job postings</p>
                  </div>
                  <Switch
                    checked={notifications.inAppJobPostingUpdates}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, inAppJobPostingUpdates: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Candidate shortlisted notifications</p>
                    <p className="text-xs text-slate-500">Email when candidates are shortlisted</p>
                  </div>
                  <Switch
                    checked={notifications.emailCandidateShortlisted}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailCandidateShortlisted: checked }))}
                  />
                </div>
              </div>

              <Button onClick={handleSaveNotifications} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="border-l-2 border-blue-200 pl-4 pb-4">
                    <p className="text-sm text-slate-900 font-medium">{activity.action}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.timestamp}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;