import React, { useState } from 'react';
import { useParams } from 'react-router-dom';



/**
 * The `PasswordReset` component is rendeered when researchers click on the 
 * reset link they receive by email, they can then reset their password using a token 
 * obtained from a URL parameter. 
 * The component  presents a form where users can enter a new password and confirm it. 
 * Upon form submission, the new password is sent to the server alongside the token for 
 * verification and update. Feedback is provided based on the server's response.
 *
 * @component
 * @example
 * // This component is  used within a route that passes a token parameter
 * <Route path="/reset-password/:token" component={PasswordReset} />
 *.
 */


const PasswordReset = () => {


  const { token } = useParams(); 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const PasswordReset = async (token, newPassword) => {
    try {
      const response = await fetch('https://devweb2023.cis.strath.ac.uk/fqb19176-nodejs/api/user/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to reset password.');
      }

      const data = await response.json();
      return data.message;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage('The new passwords do not match.');
      return;
    }

    try {
      const message = await PasswordReset(token, newPassword);
      setMessage(message || 'Your password has been reset successfully.');

    } catch (error) {
      setMessage(error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="passwordResetContainer">
      <h2 className="passwordResetTitle">Reset Your Password</h2>
      <form onSubmit={handleSubmit} className="passwordResetForm">
        <div>
          <label className="passwordResetLabel">New Password:</label>
          <input
            className="passwordResetInput"
          />
        </div>
        <div>
          <label className="passwordResetLabel">Confirm New Password:</label>
          <input
            className="passwordResetInput"
            
          />
        </div>
        <button type="submit" className="passwordResetButton">Reset Password</button>
      </form>
      {message && <p className="passwordResetMessage">{message}</p>}
    </div>
  );
};

export default PasswordReset;