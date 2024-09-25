

  const fetchParticipants = async (user_email, user) => {
    try {
      const url = new URL('https://devweb2023.cis.strath.ac.uk/fqb19176-nodejs/api/partecipants');
      if (user_email) {
        url.searchParams.append('invitedBy', user_email);
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch participants');
      }
  
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error fetching participants:', error);
      throw error; 
    }
};

export default fetchParticipants