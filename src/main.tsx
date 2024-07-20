/*Initializes pages and 
  *Persist layout between page changes
  *Keep state when navigating pages.
  *Inject additional data into pages
  *Add global CSS
*/

import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom/client";
import LandingPage from "./components/landingPage";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { getAppId } from './retool/getAppId';

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
    <App />
  </React.StrictMode>
);
