//Define and configure AWS Amplify auth resource

import { defineAuth } from '@aws-amplify/backend';

/*
  *In this case configures auth resource so that emails can be used to login
  * @see https://docs.amplify.aws/gen2/build-a-backend/auth
*/

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
});