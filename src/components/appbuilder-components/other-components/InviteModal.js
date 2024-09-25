import React, { useState } from 'react';

import handleInvite from '../../../utils/serverRequestFunctions/handleInvite';

import'./InviteModal.css';


/**
 * A modal component for sending invites to collaborate on an app.
 * Utilizes an external function `handleInvite` to send the invitation.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.showModal Indicates if the modal should be displayed.
 * @param {string} props.appId The ID of the app for which the invite is being sent.
 * @param {Object} props.user The current user object, including email and authentication token.
 * @param {Function} props.setShowModal Function to update the visibility of the modal.
 */
const InviteModal = ({ showModal, appId, user, setShowModal }) => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handles the logic for sending an invite to the specified email address.
   */
  const sendInvite = async () => {
    setIsLoading(true);
    setError('');

    try {
      await handleInvite(inviteEmail, appId, user);

      alert('Invite sent successfully!');//if successfull

      setShowModal(false);
    } catch (error) {
        alert('Error sending invite. Please try again.');//if unsuccessfull

      console.error('Error sending invite:', error);
      setError('Error sending invite. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!showModal) return null;
  return (
    <div className="inviteModalContainer">
      <h2 className="inviteModalHeader">Send Invite</h2>
      <input
        className="inviteModalInput"
        type="email"
        placeholder="Enter email"
        value={inviteEmail}
        onChange={(e) => setInviteEmail(e.target.value)}
        disabled={isLoading}
      />
      {error && <p className="inviteModalError">{error}</p>}
      <button className="inviteModalButton inviteModalSendButton" onClick={sendInvite} disabled={isLoading}>Send Invite</button>
      <button className="inviteModalButton inviteModalCancelButton" onClick={() => setShowModal(false)} disabled={isLoading}>Cancel</button>
    </div>
  );
};

export default InviteModal;
