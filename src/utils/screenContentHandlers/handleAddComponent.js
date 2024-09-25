

const handleAddComponent = async (componentType,setScreenComponents,headerText,appId,user) => {
    let newComponent = { type: componentType, content: "" };
   
  
      if (componentType === 'AlternativeActivityGenerator') {
        newComponent = {
          type: 'AlternativeActivityGenerator',
          content: {
            activity: "",
            info: "",
            goal: ""
          }
        };
      }


  
  
      if (componentType === 'LinkButton') {
        newComponent = {
          type: 'LinkButton',
          content: {
            url: "",
            label: "",
          
          }
        };
      }
      if (componentType === 'DateComponent') {
        newComponent = {
          type: 'DateComponent',
          content: "" 
        };
      }
      if (componentType === 'DecisionalBalanceSheet') {
        newComponent = {
          type: 'DecisionalBalanceSheet',
          content: {
            makingChangeBenefits: "",
            makingChangeCons: "",
            notChangingBenefits: "",
            notChangingCons: ""
          },
        };
      }


  
   
      if (componentType === 'EvaluationQuiz') {
        newComponent = {
          type: 'EvaluationQuiz',
          content: {
            question: "Do you feel happier when you exercise?",
            labels: ["Disagree", "Neutral", "Agree"],
            sliderValue: 50 
          }
        };
      }
  
   
      
      if (componentType === 'InteractiveQuiz') {
        newComponent = {
          type: 'InteractiveQuiz',
          content: {
            question: "",
            options: [
              { text: "", feedback: "" },
              { text: "", feedback: "" },
              { text: "", feedback: "" },
            ],
          },
        };
      }
    
   
    
//API OPERATIONS  
try {
    const response = await fetch(
      `https://devweb2023.cis.strath.ac.uk/fqb19176-nodejs/api/applications/${appId}/components`,
       {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        screen: headerText,
        type: newComponent.type,
        content: newComponent.content,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add component');
    }

    const componentWithId = { ...newComponent, _id: data._id };

    //Frontend OPERATIONS  
    setScreenComponents(prevComponents => {
      const updatedComponents = { ...prevComponents };
      updatedComponents[headerText] = [...prevComponents[headerText], componentWithId];
      return updatedComponents;
    });
  } catch (error) {
    console.error("Error adding component:", error.message);
  }
};

export default handleAddComponent


