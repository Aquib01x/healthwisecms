const handleInvite = async (inviteEmail, appId, user) => {
    const inviteData = {
      email: inviteEmail,
      appId: appId,
      user_email:user.email
    };
  
    try {
      const response = await fetch('https://devweb2023.cis.strath.ac.uk/fqb19176-nodejs/api/partecipants/invite', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, 
        },
        body: JSON.stringify(inviteData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send invite');
      }
  
     
    } catch (error) {
      console.error('Error sending invite:', error);
    }
  };
  
  export default handleInvite;