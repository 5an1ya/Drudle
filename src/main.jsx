import React from "react";
import ReactDOM from "react-dom/client";
import { Amplify } from "aws-amplify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage.jsx";
import LogInPage from "./pages/logInPage.jsx";
import outputs from '../amplify_outputs.json';
import Dashboard from "./pages/dashboard.jsx";
import PlantPage from "./pages/plantPage.jsx";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plant/:plantId" element={<PlantPage />} /> {/* Dynamic route for PlantPage */

      </Routes>
    </Router>
  </React.StrictMode>
);
