const handleRemoveComponent = async (index, setScreenComponents, headerText, appId,user) => {
    setScreenComponents(prevComponents => {
      const componentToRemove = prevComponents[headerText][index];
      const componentId = componentToRemove._id; 
  
     
      fetch(`https://devweb2023.cis.strath.ac.uk/fqb19176-nodejs/api/applications/${appId}/components/${componentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ screen: headerText }), 
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.message); 
        
  
        setScreenComponents(prevComponents => {
          const newComponents = [...prevComponents[headerText]];
          const updatedComponents = newComponents.filter((_, i) => i !== index);
          return { ...prevComponents, [headerText]: updatedComponents };
        });
      })
      .catch(error => console.error('Error deleting component:', error));
  

      return { ...prevComponents };
    });
  };
  


export default handleRemoveComponent
