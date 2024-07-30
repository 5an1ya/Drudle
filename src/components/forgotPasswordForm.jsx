import React, { useState } from 'react';
import { TextField, Button, Alert } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';

const ForgotPasswordForm = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [stage, setStage] = useState('request');

  const handleForgotPassword = async () => {
    try {
      await resetPassword({ 
        username: email 
      });
      setStage('confirm');
      setSuccessMessage('A verification code has been sent to your email.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleForgotPasswordSubmit = async () => {
    try {
      await confirmResetPassword({ 
        username: email, 
        confirmationCode: code, 
        newPassword: newPassword 
      });
      setSuccessMessage('Password reset successful. You can now log in with your new password.');
      setErrorMessage('');
      setStage('completed');
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      {stage === 'request' && (
        <>
          <TextField
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            marginBottom="10px"
          />
          <Button variation="primary" onClick={handleForgotPassword} marginBottom="10px">
            Reset Password
          </Button>
        </>
      )}
      {stage === 'confirm' && (
        <>
          <TextField
            placeholder="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            marginBottom="10px"
          />
          <TextField
            placeholder="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            marginBottom="10px"
          />
          <Button variation="primary" onClick={handleForgotPasswordSubmit} marginBottom="10px">
            Submit New Password
          </Button>
        </>
      )}
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
      {stage !== 'completed' && (
        <Button variation="link" onClick={onBackToLogin}>
          Back to Login
        </Button>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
