// Renders landing page components from Retool

import React, { useEffect, useState } from 'react';
import getAppConfig from '../retool/getAppConfig'; // Ensure correct path

interface LandingPageProps {
  appId: string;
}

interface AppConfig {
  title: string;
  // Add other fields based on the expected configuration structure
}

const LandingPage: React.FC<LandingPageProps> = ({ appId }) => {
  const [config, setConfig] = useState<AppConfig | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const appConfig = await getAppConfig(appId);
        setConfig(appConfig);
      } catch (error) {
        console.error('Error fetching app config:', error);
      }
    };

    fetchConfig();
  }, [appId]);

  if (!config) {
    return <div>Loading...</div>;
  }

  // Render your Retool component based on the fetched configuration
  return (
    <div>
      <h1>{config.title}</h1>
      {/* Render other parts of your component based on the fetched JSON configuration */}
    </div>
  );
};

export default LandingPage;