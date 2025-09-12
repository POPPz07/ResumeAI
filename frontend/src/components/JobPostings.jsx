import React, { useState } from 'react';
import { Plus, Users, CheckCircle, Clock, Eye, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { mockJobPostings } from '../mock';
import JobModal from './JobModal';

const JobPostings = ({ onViewCandidates }) => {
  const [jobs, setJobs] = useState(mockJobPostings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const getStatusBadgeVariant = (status) => {
    return status === 'Active' ? 'default' : 'secondary';
  };

  const handleAddNewJob = () => {
    setEditingJob(null);
    setIsModalOpen(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleSaveJob = (jobData) => {
    if (editingJob) {
      // Update existing job
      setJobs(prev => prev.map(job => 
        job.id === editingJob.id ? { ...job, ...jobData } : job
      ));
    } else {
      // Add new job
      setJobs(prev => [...prev, jobData]);
    }
    setIsModalOpen(false);
    setEditingJob(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
  };

  return (
    <>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Job Postings</h1>
            <p className="text-slate-600 mt-1">Manage your active job positions and candidates</p>
          </div>
          <Button 
            onClick={handleAddNewJob}
            className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Job
          </Button>
        </div>

        {/* Job Postings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-blue-200 relative group">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold text-slate-900 line-clamp-2 flex-1 pr-2">
                    {job.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={getStatusBadgeVariant(job.status)}
                      className={`${job.status === 'Active' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      } transition-colors duration-200`}
                    >
                      {job.status}
                    </Badge>
                    {/* Edit button - appears on hover */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditJob(job);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 p-1 h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {/* Additional job info */}
                <div className="text-sm text-slate-600 space-y-1">
                  {job.experienceLevel && (
                    <p>Experience: {job.experienceLevel}</p>
                  )}
                  {job.location && (
                    <p>Location: {job.location}</p>
                  )}
                  {job.employmentType && (
                    <p>Type: {job.employmentType}</p>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Skills preview */}
                {job.requirements && job.requirements.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-slate-700 mb-2">Key Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {job.requirements.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-slate-300 text-slate-600">
                          {skill}
                        </Badge>
                      ))}
                      {job.requirements.length > 3 && (
                        <Badge variant="outline" className="text-xs border-slate-300 text-slate-600">
                          +{job.requirements.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

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

        {/* Empty State */}
        {jobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No job postings yet</h3>
            <p className="text-slate-500 mb-6">Get started by creating your first job posting</p>
            <Button onClick={handleAddNewJob} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add New Job
            </Button>
          </div>
        )}
      </div>

      {/* Job Modal */}
      <JobModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        job={editingJob}
        onSave={handleSaveJob}
      />
    </>
  );
};

export default JobPostings;