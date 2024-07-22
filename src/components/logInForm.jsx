import React, { useState } from 'react';
import { TextField, Button, Alert } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '/amplify/auth/authCheck';

const LogInForm = ({ onForgotPassword, onCreateAccount }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const authenticated = await isAuthenticated();
      if (authenticated) {
        navigate('/dashboard'); // Navigate to dashboard if authenticated
      } else {
        setErrorMessage('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <TextField placeholder="Email" marginBottom="10px" />
      <TextField placeholder="Password" type="password" marginBottom="10px" />
      {errorMessage && (
        <Alert variation="error" marginBottom="10px">
          {errorMessage}
        </Alert>
      )}
      <Button variation="primary" onClick={handleLogin} marginBottom="10px">
        Login
      </Button>
      <Button variation="link" onClick={onForgotPassword} marginBottom="10px">
        Forgot Password
      </Button>
      <Button variation="link" onClick={onCreateAccount}>
        Create Account
      </Button>
    </div>
  );
};

export default LogInForm;