import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
// import { data } from './data/resource';

/**
 * Define the backend resources.
 * @see https://docs.amplify.aws/react/build-a-backend/ for adding storage, functions, and more
 */
defineBackend({
  auth,
  // data,
});

