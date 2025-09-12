# TrueView Dashboard - Backend Integration Contracts

## Overview
This document outlines the API contracts and integration plan for converting the frontend-only TrueView dashboard to a full-stack application.

## Current Mock Data Structure

### Job Postings
- Located in `/app/frontend/src/mock.js`
- Fields: id, title, status, totalCandidates, screened, shortlisted, description, requirements[]

### Candidates (Generated per job)
- Dynamic generation via `generateMockCandidates(jobId)`
- Fields: id, name, email, phone, avatar, jdMatchScore, verificationScore, status, linkedin, github, skillMatches[], aiAnalysis{}, verification{}

## API Endpoints to Implement

### Job Postings APIs
```
GET /api/jobs
- Returns list of all job postings
- Response: Array of job objects

POST /api/jobs
- Creates new job posting
- Body: { title, description, requirements[], status }

PUT /api/jobs/:id
- Updates existing job posting

DELETE /api/jobs/:id
- Deletes job posting
```

### Candidates APIs
```
GET /api/jobs/:jobId/candidates
- Returns candidates for specific job
- Query params: search, status filter
- Response: Array of candidate objects

GET /api/candidates/:id
- Returns detailed candidate information
- Response: Single candidate object with full details

PUT /api/candidates/:id/status
- Updates candidate status (Shortlisted/Rejected/Pending Review)
- Body: { status }
```

### AI Analysis APIs (Optional - can use mock initially)
```
POST /api/candidates/:id/analyze
- Triggers AI analysis for candidate resume vs job description
- Response: Updated candidate with AI analysis results
```

## Database Schema

### Jobs Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  requirements: [String],
  status: String, // "Active" | "Closed"
  createdAt: Date,
  updatedAt: Date,
  metrics: {
    totalCandidates: Number,
    screened: Number,
    shortlisted: Number
  }
}
```

### Candidates Collection
```javascript
{
  _id: ObjectId,
  jobId: ObjectId,
  name: String,
  email: String,
  phone: String,
  avatar: String,
  linkedin: String,
  github: String,
  resumeUrl: String,
  jdMatchScore: Number,
  verificationScore: Number,
  status: String, // "Shortlisted" | "Rejected" | "Pending Review"
  skillMatches: [{
    skill: String,
    score: Number,
    found: Boolean
  }],
  aiAnalysis: {
    recommendation: String,
    reasoning: String
  },
  verification: {
    experience: Boolean,
    education: Boolean,
    skills: Boolean,
    projects: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Frontend Integration Changes

### Replace Mock Data Usage
1. **JobPostings.jsx**: Replace `mockJobPostings` with API call to `/api/jobs`
2. **CandidateDetails.jsx**: Replace `generateMockCandidates()` with API call to `/api/jobs/:jobId/candidates`
3. **CandidateModal.jsx**: Add API calls for status updates via `/api/candidates/:id/status`

### State Management Updates
- Add loading states for API calls
- Add error handling for failed requests
- Implement optimistic updates for better UX
- Add toast notifications for successful operations

### API Integration Points
- Use existing `REACT_APP_BACKEND_URL` environment variable
- Implement axios interceptors for consistent error handling
- Add proper loading spinners and error states

## Implementation Priority

### Phase 1: Basic CRUD
1. Implement Jobs API endpoints
2. Implement Candidates API endpoints  
3. Replace frontend mock data with API calls
4. Basic error handling and loading states

### Phase 2: Advanced Features
1. Search and filtering functionality
2. File upload for resumes
3. Candidate status update workflows
4. Real-time updates (optional)

### Phase 3: AI Integration (Future)
1. Resume parsing and analysis
2. JD matching algorithms
3. Profile verification against LinkedIn/GitHub
4. Advanced reporting and analytics

## Notes
- Current mock data provides realistic test scenarios
- AI analysis can remain mocked initially for MVP
- Focus on core CRUD operations first
- Ensure responsive design works with real data
- Maintain existing UI/UX patterns and interactions