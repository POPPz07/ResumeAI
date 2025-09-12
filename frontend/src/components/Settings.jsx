import React, { useState } from 'react';
import { Users, CreditCard, Plug, Key, Palette, Plus, Trash2, Edit, Upload, Sliders } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Slider } from './ui/slider';
import { useToast } from '../hooks/use-toast';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteData, setInviteData] = useState({ email: '', role: '' });
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Mock data
  const [users] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@trueview.com', role: 'Admin' },
    { id: 2, name: 'Mike Chen', email: 'mike.chen@trueview.com', role: 'Recruiter' },
    { id: 3, name: 'Emily Davis', email: 'emily.davis@trueview.com', role: 'Recruiter' },
    { id: 4, name: 'Alex Kumar', email: 'alex.kumar@trueview.com', role: 'Viewer' }
  ]);

  const [subscription] = useState({
    plan: 'Pro Plan',
    resumesUsed: 75,
    resumesLimit: 100,
    jobPostingsUsed: 5,
    jobPostingsLimit: 10
  });

  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'Slack', description: 'Get notifications in Slack channels', connected: true },
    { id: 2, name: 'Google Calendar', description: 'Schedule interviews automatically', connected: false },
    { id: 3, name: 'LinkedIn Recruiter', description: 'Import candidate profiles', connected: true },
    { id: 4, name: 'Greenhouse ATS', description: 'Sync with your existing ATS', connected: false },
    { id: 5, name: 'Microsoft Teams', description: 'Team collaboration and notifications', connected: false }
  ]);

  const [apiKeys] = useState([
    { id: 1, name: 'Production API', key: 'sk_live_••••••••••••••••', created: '2024-01-15', lastUsed: '2 hours ago' },
    { id: 2, name: 'Development API', key: 'sk_test_••••••••••••••••', created: '2024-01-10', lastUsed: '1 day ago' }
  ]);

  const [scoringThresholds, setScoringThresholds] = useState({
    jdMatchThreshold: [75],
    verificationThreshold: [80]
  });

  const handleInviteUser = async () => {
    if (!inviteData.email || !inviteData.role) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsInviteModalOpen(false);
      setInviteData({ email: '', role: '' });
      toast({
        title: "Invitation sent",
        description: `Invitation sent to ${inviteData.email}`
      });
    }, 1000);
  };

  const handleToggleIntegration = (integrationId) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, connected: !integration.connected }
        : integration
    ));
    
    const integration = integrations.find(i => i.id === integrationId);
    toast({
      title: integration.connected ? "Integration disconnected" : "Integration connected",
      description: `${integration.name} has been ${integration.connected ? 'disconnected' : 'connected'}.`
    });
  };

  const handleGenerateApiKey = () => {
    toast({
      title: "API Key generated",
      description: "New API key has been generated successfully."
    });
  };

  const handleSaveThresholds = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Thresholds updated",
        description: "Scoring thresholds have been saved."
      });
    }, 1000);
  };

  const handleLogoUpload = () => {
    toast({
      title: "Logo upload",
      description: "Company logo upload functionality will be available soon."
    });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">Manage your workspace and company preferences</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-none lg:inline-flex">
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center space-x-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center space-x-2">
            <Plug className="h-4 w-4" />
            <span className="hidden sm:inline">Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center space-x-2">
            <Key className="h-4 w-4" />
            <span className="hidden sm:inline">API Keys</span>
          </TabsTrigger>
          <TabsTrigger value="customization" className="flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Customization</span>
          </TabsTrigger>
        </TabsList>

        {/* User Management */}
        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>User Management</CardTitle>
                <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Invite User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Invite Team Member</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="inviteEmail">Email Address</Label>
                        <Input
                          id="inviteEmail"
                          type="email"
                          value={inviteData.email}
                          onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="colleague@company.com"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Role</Label>
                        <Select value={inviteData.role} onValueChange={(value) => setInviteData(prev => ({ ...prev, role: value }))}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Admin">Admin - Full access</SelectItem>
                            <SelectItem value="Recruiter">Recruiter - Can manage jobs and candidates</SelectItem>
                            <SelectItem value="Viewer">Viewer - Read-only access</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" onClick={() => setIsInviteModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleInviteUser} disabled={isSaving}>
                          {isSaving ? 'Sending...' : 'Send Invitation'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing & Subscription */}
        <TabsContent value="billing" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-900">{subscription.plan}</span>
                  <Button variant="outline">Change Plan</Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Resumes Screened This Month</span>
                      <span>{subscription.resumesUsed}/{subscription.resumesLimit}</span>
                    </div>
                    <Progress value={(subscription.resumesUsed / subscription.resumesLimit) * 100} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Active Job Postings</span>
                      <span>{subscription.jobPostingsUsed}/{subscription.jobPostingsLimit}</span>
                    </div>
                    <Progress value={(subscription.jobPostingsUsed / subscription.jobPostingsLimit) * 100} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: 'Jan 1, 2024', amount: '$99.00', status: 'Paid' },
                    { date: 'Dec 1, 2023', amount: '$99.00', status: 'Paid' },
                    { date: 'Nov 1, 2023', amount: '$99.00', status: 'Paid' }
                  ].map((invoice, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium text-slate-900">{invoice.amount}</p>
                        <p className="text-sm text-slate-500">{invoice.date}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">{invoice.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900">{integration.name}</h4>
                      <p className="text-sm text-slate-600">{integration.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={integration.connected ? 'default' : 'secondary'}>
                        {integration.connected ? 'Connected' : 'Not Connected'}
                      </Badge>
                      <Switch
                        checked={integration.connected}
                        onCheckedChange={() => handleToggleIntegration(integration.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys */}
        <TabsContent value="api" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>API Keys</CardTitle>
                <Button onClick={handleGenerateApiKey} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Generate New Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">{key.name}</TableCell>
                      <TableCell className="font-mono text-sm">{key.key}</TableCell>
                      <TableCell>{key.created}</TableCell>
                      <TableCell>{key.lastUsed}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customization */}
        <TabsContent value="customization" className="mt-6">
          <div className="space-y-6">
            {/* Scoring Thresholds */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sliders className="h-5 w-5" />
                  <span>Scoring Thresholds</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium">
                    JD Match Score Threshold: {scoringThresholds.jdMatchThreshold[0]}%
                  </Label>
                  <p className="text-xs text-slate-500 mb-3">
                    Candidates below this threshold will be marked as low match
                  </p>
                  <Slider
                    value={scoringThresholds.jdMatchThreshold}
                    onValueChange={(value) => setScoringThresholds(prev => ({ ...prev, jdMatchThreshold: value }))}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    Verification Score Threshold: {scoringThresholds.verificationThreshold[0]}%
                  </Label>
                  <p className="text-xs text-slate-500 mb-3">
                    Candidates below this threshold will be flagged for manual review
                  </p>
                  <Slider
                    value={scoringThresholds.verificationThreshold}
                    onValueChange={(value) => setScoringThresholds(prev => ({ ...prev, verificationThreshold: value }))}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>

                <Button onClick={handleSaveThresholds} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                  {isSaving ? 'Saving...' : 'Save Thresholds'}
                </Button>
              </CardContent>
            </Card>

            {/* Company Branding */}
            <Card>
              <CardHeader>
                <CardTitle>Company Branding</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Company Logo</Label>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-600">T</span>
                    </div>
                    <Button variant="outline" onClick={handleLogoUpload}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload New Logo
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Recommended size: 200x200px, PNG or JPG format
                  </p>
                </div>

                <Button onClick={handleSaveThresholds} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                  Save Branding
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;