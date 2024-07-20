//Retrieves configurations of apps from Retool using configured Axios instance
import retoolApi from './retoolApi'; // Ensure the path is correct

interface AppConfig {
  title: string;
  // Add other fields based on the expected configuration structure
}

const getAppConfig = async (appId: string): Promise<AppConfig> => {
  try {
    const response = await retoolApi.get(`/api/v2/apps/${appId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching app config:', error);
    throw error;
  }
};

export default getAppConfig;