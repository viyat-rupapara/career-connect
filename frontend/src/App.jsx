import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import ApplicationProcess from './pages/ApplicationProcess';
import CreateJobPosting from './pages/CreateJobPosting';
import ApplicationReview from './pages/ApplicationReview';
import AccountSettings from './pages/AccountSettings';
import Notifications from './pages/Notifications';
import Dashboard from './pages/Dashboard';
import MyApplications from './pages/MyApplications';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main className="px-3 py-4 flex-grow-1 min-vh-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:jobId" element={<JobDetails />} />
            <Route path="/jobs/:jobId/apply" element={<ApplicationProcess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/account/settings" element={<AccountSettings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Recruiter Routes */}
            <Route path="/recruiter/post-job" element={<CreateJobPosting />} />
            <Route path="/recruiter/jobs/:jobId/edit" element={<CreateJobPosting />} />
            <Route path="/recruiter/applications/:applicationId" element={<ApplicationReview />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
