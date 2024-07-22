import React, { useState } from 'react';
import { signUp } from 'aws-amplify/auth';
import { TextField, Button, Alert } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const CreateAccountForm = ({ onBackToLogin }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async () => {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: email,
        password: password,
        options: {
          userAttributes: {
            email: email,
          },
        },
      });

      if (isSignUpComplete) {
        setSuccessMessage('Account created successfully! Please check your email for verification.');
        setErrorMessage('');
      } else {
        setErrorMessage(`Next step: ${nextStep}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <TextField
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        marginBottom="10px"
      />
      <TextField
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
      <Button variation="primary" onClick={handleSignUp} marginBottom="10px">
        Create Account
      </Button>
      <Button variation="link" onClick={onBackToLogin}>
        Back to Login
      </Button>
    </div>
  );
};

export default CreateAccountForm;