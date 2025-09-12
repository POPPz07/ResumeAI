import React from 'react';
import { Plus, Users, CheckCircle, Clock, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { mockJobPostings } from '../mock';

const JobPostings = ({ onViewCandidates }) => {
  const getStatusBadgeVariant = (status) => {
    return status === 'Active' ? 'default' : 'secondary';
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Job Postings</h1>
          <p className="text-slate-600 mt-1">Manage your active job positions and candidates</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
          <Plus className="mr-2 h-4 w-4" />
          Add New Job
        </Button>
      </div>

      {/* Job Postings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockJobPostings.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-blue-200">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold text-slate-900 line-clamp-2">
                  {job.title}
                </CardTitle>
                <Badge 
                  variant={getStatusBadgeVariant(job.status)}
                  className={`ml-2 ${job.status === 'Active' 
                    ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  } transition-colors duration-200`}
                >
                  {job.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-4 w-4 text-blue-600 mr-1" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{job.totalCandidates}</p>
                  <p className="text-xs text-slate-500">Candidates</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{job.screened}</p>
                  <p className="text-xs text-slate-500">Screened</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="h-4 w-4 text-amber-600 mr-1" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{job.shortlisted}</p>
                  <p className="text-xs text-slate-500">Shortlisted</p>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                variant="outline" 
                className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                onClick={() => onViewCandidates(job)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Candidates
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State for demonstration */}
      {mockJobPostings.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No job postings yet</h3>
          <p className="text-slate-500 mb-6">Get started by creating your first job posting</p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add New Job
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobPostings;