const addDefaultComponents = async (handleAddComponent,setScreenComponents,appId,user) => {
    const defaultComponents = [
      { type: 'Text', content: "" },
      { type: 'Paragraph', content: "" },
    ];

    const defaultGuidelinesComponents = [

      { type: 'Text', content: "" },
      { type: 'Paragraph', content: "" },
      {
        type: 'PlacementQuiz'
      
      }
  
    ];
  

    for (const component of defaultComponents) {
      await handleAddComponent(component.type, setScreenComponents, 'home', appId,user);
    }
  

    for (const component of defaultGuidelinesComponents) {
      await handleAddComponent(component.type, setScreenComponents, 'guidelines', appId,user);
    }
  };
  

export default addDefaultComponents