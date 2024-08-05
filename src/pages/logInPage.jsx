import React, { useState } from "react";
import { View, Text, Button } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import LogInForm from "../components/logInForm";
import ForgotPasswordForm from "../components/forgotPasswordForm";
import CreateAccountForm from "../components/createAccountForm";

const LogInPage = () => {
  const [currentForm, setCurrentForm] = useState("login"); // State to track the current form

  const renderForm = () => {
    switch (currentForm) {
      case "login":
        return (
          <LogInForm
            onForgotPassword={() => setCurrentForm("forgotPassword")}
            onCreateAccount={() => setCurrentForm("createAccount")}
          />
        );
      case "forgotPassword":
        return (
          <ForgotPasswordForm onBackToLogin={() => setCurrentForm("login")} />
        );
      case "createAccount":
        return (
          <CreateAccountForm onBackToLogin={() => setCurrentForm("login")} />
        );
      default:
        return (
          <LogInForm
            onForgotPassword={() => setCurrentForm("forgotPassword")}
            onCreateAccount={() => setCurrentForm("createAccount")}
          />
        );
    }
  };

  return (
    <View
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      backgroundColor="#f5f5f5"
    >
      <View
        backgroundColor="white"
        padding="20px"
        borderRadius="5px"
        boxShadow="0 0 10px rgba(0,0,0,0.1)"
        width="300px"
        textAlign="center"
      >
        <Text as="h1" fontSize="2em" marginBottom="20px">
          {currentForm === "login"
            ? "Login"
            : currentForm === "forgotPassword"
            ? "Forgot Password"
            : "Create Account"}
        </Text>
        {renderForm()}
      </View>
    </View>
  );
};

export default LogInPage;
