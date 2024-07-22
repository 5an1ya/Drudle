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

const App: React.FC = () => {
  const [appId, setAppId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppId = async () => {
      try {
        const id = await getAppId('LandingPage'); // Use the component name
        setAppId(id);
      } catch (error) {
        console.error('Error fetching app ID:', error);
      }
    };

    fetchAppId();
  }, []);

  if (!appId) {
    return <div>Loading...</div>;
  }

  return <LandingPage appId={appId} />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
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
