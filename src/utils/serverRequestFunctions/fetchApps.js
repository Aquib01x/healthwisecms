const fetchApps = async (user) => {
    try {
      const response = await fetch('https://devweb2023.cis.strath.ac.uk/fqb19176-nodejs/api/applications', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error during fetch:', error);
      throw error; 
    }
  };
  
  export default fetchApps;