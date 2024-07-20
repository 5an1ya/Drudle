//Check to see if current user is authenticated (signed in)
import { getCurrentUser } from 'aws-amplify/auth';

export const isAuthenticated = async (): Promise<boolean> => {

  try {
    await getCurrentUser();
    return true;
  } 
  catch {
    return false;
  }

  };