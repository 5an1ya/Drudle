/*Initializes pages and 
  *Persist layout between page changes
  *Keep state when navigating pages.
  *Inject additional data into pages
  *Add global CSS
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/landingPage.jsx';
import LogInPage from './pages/logInPage.jsx';
import outputs from '../amplify_outputs.json';
import Dashboard from './pages/dashboard.jsx';

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);