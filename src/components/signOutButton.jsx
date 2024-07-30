import React from 'react';
import { Button } from '@aws-amplify/ui-react';
import { signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/'); // Redirect to login page after sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Button variation="primary" onClick={handleSignOut} marginBottom="10px">
      Sign Out
    </Button>
  );
};

export default SignOutButton;