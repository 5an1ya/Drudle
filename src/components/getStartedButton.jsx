import React from 'react';
import { Button } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';

const GetStartedButton = () => {
  const navigate = useNavigate();

  const getStartedOnClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <Button variation="primary" onClick={getStartedOnClick}>
      Get Started
    </Button>
  );
};

export default GetStartedButton;
