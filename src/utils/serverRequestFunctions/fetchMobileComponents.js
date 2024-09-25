const fetchMobileComponents = async (appId) => {
    try {
      const response = await fetch(`https://devweb2023.cis.strath.ac.uk/fqb19176-nodejs/api/applications/${appId}/components`
      
   
      
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
    
      return {
        home: data.home.components,
        guidelines:data.guidelines.components,
        precontemplation: data.precontemplation.components,
        contemplation: data.contemplation.components,
        preparation: data.preparation.components,
        action: data.action.components,
        maintenance: data.maintenance.components,
    };
    } catch (error) {
      console.error("Failed to fetch components:", error);
      return { home: [], guidelines: [] };    }
  };
  
  export default fetchMobileComponents;
  