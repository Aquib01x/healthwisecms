


const handleUpdateComponentContent = async (componentId, index, newContent, setScreenComponents, headerText, appId,user) => {
  const updateData = {
    screen: headerText,
    content: newContent
  };

  console.log("TEST: " + appId,componentId)
  try {
    const response = await fetch(`https://devweb2023.cis.strath.ac.uk/fqb19176-nodejs/api/applications/${appId}/components/${componentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    setScreenComponents(prevComponents => {
      const newComponents = [...prevComponents[headerText]];
      newComponents[index] = { ...newComponents[index], content: newContent };
      return { ...prevComponents, [headerText]: newComponents };
    });

  } catch (error) {
    console.error("Failed to update component:", error);
  }
};

export default handleUpdateComponentContent

