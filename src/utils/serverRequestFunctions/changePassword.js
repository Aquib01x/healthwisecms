const changePassword = async ({ oldPassword, newPassword, confirmPassword, user }) => {
 
    const response = await fetch('https://devweb2023.cis.strath.ac.uk/fqb19176-nodejs/api/user/change-password', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`, 
      },
      body: JSON.stringify({ oldPassword, newPassword,confirmPassword }),
    });
    const data = await response.json(); 

  
    if (!response.ok) {
        throw new Error(data.error || 'An unknown error occurred');
      }
    
  
    return await data;
  };

  export default changePassword;

