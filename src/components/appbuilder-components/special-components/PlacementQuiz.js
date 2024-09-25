import React, { useState } from 'react';

const PlacementQuiz = ({ component, onUpdateQuizContent, index, appId, componentId, isEditMode = true,onSubmit  }) => {

 
  const [questions, setQuestions] = useState(component.content.questions || Array(5).fill(''));



  const handleQuestionChange = (value, idx) => {
    if (!isEditMode) return; 

    const updatedQuestions = questions.map((question, questionIdx) => 
      idx === questionIdx ? value : question
    );
    setQuestions(updatedQuestions);

    onUpdateQuizContent(componentId, index, { ...component.content, questions: updatedQuestions }, appId);
  };
  const [selectedOption, setSelectedOption] = useState(null);


  const handleCheckboxChange = (idx) => {
    setSelectedOption(idx);
};

const handleSubmit = () => {

  onSubmit(selectedOption);


};




  return (
    <div className="placementQuiz">
      <h2>Progress Quiz</h2>
      <p>Please choose one option</p>
      {questions.map((question, idx) => (
        <div key={idx} className="quizOption">
       <span style={{ marginRight: '8px' }}>&bull;</span>
                    {isEditMode ? (
                        <input//HAS TO BE INPUT OTHERWISE NO PERSISTANCE
                            style={{ display: 'inline', verticalAlign: 'middle' }}
                            value={question}
                            onChange={(e) => handleQuestionChange(e.target.value, idx)}
                            placeholder={`Option ${idx + 1}`}
                        />
                    ) : (
                        <span style={{ display: 'inline' }}>{question || `Option ${idx + 1}`}</span>
                    )}
        
      
            <input
          
              type="checkbox"
              checked={selectedOption === idx}
              onChange={() => handleCheckboxChange(idx)}
            />
     
        </div>
      ))}
      {!isEditMode &&                 <button type="button" onClick = {handleSubmit}>Submit</button>
}
    </div>
  );
};

export default PlacementQuiz;
