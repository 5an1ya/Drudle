import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
// import { data } from './data/resource';

/**
 * Define the backend resources.
 * @see https://docs.amplify.aws/react/build-a-backend/ for adding storage, functions, and more
 */
const backend = defineBackend({
  auth,
  // data,
});

backend.addOutput({
  auth: {
    aws_region: "us-east-1",
    user_pool_id: "us-east-1_cClElu5l4",
    user_pool_client_id: "6155juidhd02svq6kctqo025c8",
    identity_pool_id: "us-east-1:e583f098-6150-4100-8c34-c6aedab2a12e",
    username_attributes: ["email"],
    standard_required_attributes: ["email"],
    user_verification_types: ["email"],
    unauthenticated_identities_enabled: true,
    password_policy: {
      min_length: 8,
      require_lowercase: true,
      require_uppercase: true,
      require_numbers: true,
      require_symbols: true,
    }
  }
})