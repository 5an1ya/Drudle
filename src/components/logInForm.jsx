import React, { useState } from 'react';
import { TextField, Button, Alert } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { signIn } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

const LogInForm = ({ onForgotPassword, onCreateAccount }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signIn({
        username: email, 
        password: password
      });
      navigate('/dashboard'); // Navigate to dashboard if authenticated
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Login failed. Please check your credentials and try again.');
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