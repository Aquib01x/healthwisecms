import React, { useState } from 'react';
import './PasswordResetRequest.css';
import ResetRequest from '../../utils/serverRequestFunctions/passwordResetRequest';

/**
 * The 'PasswordResetRequest' component displays a form for requesting a password reset. 
 * Researcher can enter their email to receive a reset link.
 * WHen submitted, `ResetRequest` util function is called to handle the server request,
 * `onResetRequestSubmitted` prop is used to notify parent components of the submission.
 
 * @component
 * @param {Object} props
 * @param {Function} [props.onResetRequestSubmitted] 
 *
 * @example
 * <PasswordResetRequest onResetRequestSubmitted={(submitted) => console.log(submitted)} />
 */

const PasswordResetRequest = ({ onResetRequestSubmitted }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
      const data = await ResetRequest(email);

      setMessage(data.message || 'If an account with that email exists, a password reset link has been sent.');
      setEmail('');
      if (onResetRequestSubmitted) onResetRequestSubmitted(true);
    } catch (error) {
      setMessage(error.message || 'An unexpected error occurred.');
    }
    console.log('Requesting password reset for:', email);

    onResetRequestSubmitted(true);
  };


  return (
    <div className="passwordResetContainer">
      <form onSubmit={handleSubmit}>
        <h3 className="passwordResetHeading">Password Reset Request</h3>
        <label className="passwordResetLabel">Email:</label>
        <input
          className="passwordResetInput"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="passwordResetButtonContainer">
          <button className="passwordResetButton" type="submit">Send Password Reset Email</button>
        </div>        {message && <div className="passwordResetMessage">{message}</div>}
      </form>
    </div>
  );
};

export default PasswordResetRequest;