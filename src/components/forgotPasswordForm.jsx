import React, { useState } from 'react';
import { TextField, Button, Alert } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const ForgotPasswordForm = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleForgotPassword = async () => {
    // Add logic for forgot password here
  };

  return (
    <div>
      <TextField
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        marginBottom="10px"
      />
      {errorMessage && (
        <Alert variation="error" marginBottom="10px">
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert variation="success" marginBottom="10px">
          {successMessage}
        </Alert>
      )}
      <Button variation="primary" onClick={handleForgotPassword} marginBottom="10px">
        Reset Password
      </Button>
      <Button variation="link" onClick={onBackToLogin}>
        Back to Login
      </Button>
    </div>
  );
};

export default ForgotPasswordForm;
