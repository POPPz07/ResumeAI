import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import JobPostings from "./components/JobPostings";
import CandidateDetails from "./components/CandidateDetails";
import CandidateModal from "./components/CandidateModal";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [activeView, setActiveView] = useState('jobs');
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleViewCandidates = (job) => {
    setSelectedJob(job);
    setActiveView('candidates');
  };

  const handleBackToJobs = () => {
    setSelectedJob(null);
    setActiveView('jobs');
  };

  const handleViewCandidate = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleCloseModal = () => {
    setSelectedCandidate(null);
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'jobs':
        return <JobPostings onViewCandidates={handleViewCandidates} />;
      case 'candidates':
        return selectedJob ? (
          <CandidateDetails 
            job={selectedJob} 
            onBack={handleBackToJobs}
            onViewCandidate={handleViewCandidate}
          />
        ) : null;
      case 'dashboard':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-2">Welcome to TrueView Dashboard - Coming Soon!</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
            <p className="text-slate-600 mt-2">Settings page - Coming Soon!</p>
          </div>
        );
      default:
        return <JobPostings onViewCandidates={handleViewCandidates} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto">
          {renderMainContent()}
        </main>
      </div>
      
      {selectedCandidate && (
        <CandidateModal 
          candidate={selectedCandidate} 
          job={selectedJob}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
