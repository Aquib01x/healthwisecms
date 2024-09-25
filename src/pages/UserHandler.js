import React, { useState } from 'react';
import Login from '../components/userhandler-components/Login'; 
import Signup from '../components/userhandler-components/Signup'; 

import PasswordResetRequest from '../components/userhandler-components/PasswordResetRequest'; 
import './UserHandler.css';

/**
 * The `UserHandler` component manages the user authentication pages login, signup, and password reset request. 
 * It renders the appropriate component based on the user's choice or authentication state. 
 * It uses the state `view` to track the current authentication view and dynamically renders the 
 * corresponding component.
 *
 * @component
 * @example
 *
 * <UserHandler />
 *
 * @returns The UserHandler component renders the chosen authentication-related component along with 
 * buttons to navigate between the authentication views.
 */

const UserHandler = () => {


  const [view, setView] = useState('login');

  const renderComponent = () => {
    switch (view) {
      case 'login':
        return <Login />;
      case 'signup':
        return <Signup />;
      case 'reset':
        return <PasswordResetRequest onResetRequestSubmitted={() => setView('login')} />;
      default:
        return <Login />;
    }
  };


  return (
    <div>
      {renderComponent()}
      <div>
      
        {view !== 'reset' && (
          <button className="userHandlerButton" onClick={() => setView(view === 'login' ? 'signup' : 'login')}>
            {view === 'login' ? 'Need an account? Sign up' : 'Have an account? Log in'}
          </button>
        )}
        {view !== 'signup' && (
          <button className="userHandlerButton" onClick={() => setView('reset')}>
            Forgot password?
          </button>
        )}
        {view === 'reset' && (
          <button className="userHandlerButton" onClick={() => setView('login')}>
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default UserHandler;