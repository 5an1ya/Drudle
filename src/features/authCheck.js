//Check to see if current user is authenticated (signed in)
import { getCurrentUser } from 'aws-amplify/auth';

export const isAuthenticated = async () => {
  try {
    await Auth.currentAuthenticatedUser();
    return true;
  } catch {
    return false;
  }
};