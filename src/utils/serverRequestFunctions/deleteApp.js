const deleteApp = async (appId, user) => {

    const isConfirmed = window.confirm("Are you sure you want to delete this app?");
    if (!isConfirmed) {
        return; 
    }
    try {
      const response = await fetch(`https://devweb2023.cis.strath.ac.uk/fqb19176-nodejs/api/applications/${appId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
         
        },
      });

      if (!response.ok) {
       
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete the application');
      }

      console.log('Application deleted successfully');
      
    
      
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
};

export default deleteApp;