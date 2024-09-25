

const fetchComponents = async (setScreenComponents,addDefaultComponents,handleAddComponent,appId,user) => {

    try {
      const response = await fetch(
        `https://devweb2023.cis.strath.ac.uk/fqb19176-nodejs/api/applications/${appId}/components`
      
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      
  
      setScreenComponents({
        home: data.home.components,
        guidelines:data.guidelines.components,
        precontemplation: data.precontemplation.components,
        contemplation: data.contemplation.components,
        preparation: data.preparation.components,
        action: data.action.components,
        maintenance: data.maintenance.components,
      });
      console.log("Updated state:", setScreenComponents);


      if (data.home.components.length === 0 && data.guidelines.components.length === 0) {
        addDefaultComponents(handleAddComponent,setScreenComponents,appId,user);
  
      }
     
    } catch (error) {
      console.error("Failed to fetch components:", error);
    }
  };

  
  export default fetchComponents;

  