import React, { useState } from 'react';
import { useUserAuthContext } from "../../../../hooks/useUserAuthContext.js";

import  changePassword  from '../../../../utils/serverRequestFunctions/changePassword.js'; 

import './Settings.css';

const AccountManagement = () => {
  const { user } = useUserAuthContext();
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  
  const handleSubmit = async (e) => {
    console.log(oldPassword,newPassword,confirmPassword)

    e.preventDefault();
    if(newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }


    try {
      
      await changePassword({ oldPassword, newPassword,confirmPassword, user });
      setMessage('Password updated successfully.');
    
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage(error.message); 
    }
  };

  return (
    <div className="accountManagementContainer">
      <h1 className="accountManagementHeader">Account Management</h1>
      <p>Email: {user.email}</p>
      <form onSubmit={handleSubmit} className="accountManagementForm">
        <div>
          <label>Old Password</label>
          <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
        </div>
        <div>
          <label>New Password</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirm New Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit">Save</button>
      </form>
      {message && <p className="accountManagementMessage">{message}</p>}
    </div>
  );
};

export default AccountManagement;

