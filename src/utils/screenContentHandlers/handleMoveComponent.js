const handleMoveComponent = async (componentId, direction, setScreenComponents, headerText, appId,user) => {
  try {
    const response = await fetch(`https://devweb2023.cis.strath.ac.uk/fqb19176-nodejs/api/applications/${appId}/components/${componentId}/move`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        screen: headerText,
        direction: direction,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to move component');
    }

  
    setScreenComponents(prevComponents => {
      let newComponents = [...prevComponents[headerText]];
      const index = newComponents.findIndex(component => component._id === componentId);
      if (direction === 'up' && index > 0) {
        [newComponents[index - 1], newComponents[index]] = [newComponents[index], newComponents[index - 1]];
      } else if (direction === 'down' && index < newComponents.length - 1) {
        [newComponents[index], newComponents[index + 1]] = [newComponents[index + 1], newComponents[index]];
      }
      return { ...prevComponents, [headerText]: newComponents };
    });

  } catch (error) {
    console.error("Error moving component:", error.message);
  }
};





export default handleMoveComponent
