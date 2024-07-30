import React, { useState } from 'react';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import { TextField, Button, Alert } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const CreateAccountForm = ({ onBackToLogin }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSignUpComplete, setIsSignUpComplete] = useState(false);

  const handleSignUp = async () => {
    try {
      await signUp({
        username: email,
        password: password,
        options: {
          userAttributes: {
            email: email // User Pool requires this attribute
          },
        }
      });
      setIsSignUpComplete(true); // Show confirmation step
      setSuccessMessage('Account created successfully! Please check your email for the confirmation code.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message || JSON.stringify(error));
      setSuccessMessage('');
    }
  };

  const handleConfirmSignUp = async () => {
    try {
      // Use email as username to confirm sign-up
      await confirmSignUp({
        username: email, 
        confirmationCode: confirmationCode
      }); 
      setSuccessMessage('Account confirmed successfully! You can now log in.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message || JSON.stringify(error));
      setSuccessMessage('');
    }
  };

  return (
    <div>
      {!isSignUpComplete ? (
        <>
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
        </>
      ) : (
        <>
          <TextField
            placeholder="Confirmation Code"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
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
          <Button variation="primary" onClick={handleConfirmSignUp} marginBottom="10px">
            Confirm Sign Up
          </Button>
        </>
      )}
    </div>
  );
};

export default CreateAccountForm;
