import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';
import { GoogleOAuthProvider } from "@react-oauth/google"
// const dotenv = require(".dotenv").config();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>

    <GoogleOAuthProvider clientId={process.env.REACT_APP_client_Id}>
    <ToastContainer floatingTime={2000} />
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
