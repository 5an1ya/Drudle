//Gets Retool app ids

const appIdMapping: { [key: string]: string } = {
    LandingPage: '0bcf68b6-4516-11ef-86fd-c78a4826ddd9',
    // Add other component names and their corresponding app IDs here
  };
  
  export const getAppId = async (componentName: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const appId = appIdMapping[componentName];
      if (appId) {
        resolve(appId);
      } else {
        reject(new Error(`App ID for component ${componentName} not found`));
      }
    });
  };