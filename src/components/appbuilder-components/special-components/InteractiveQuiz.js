import React, { useState } from 'react';

const InteractiveQuiz = ({ component, onUpdateQuizContent, index, appId, componentId }) => {
  const [quizzes, setQuizzes] = useState(component.content.quizzes || [
    {
      question: '',
      options: [
        { text: '', feedback: '' },
        { text: '', feedback: '' },
        { text: '', feedback: '' }
      ]
    }
  ]);

  const handleAddQuiz = () => {
    const newQuiz = {
      question: '',
      options: [
        { text: '', feedback: '' },
        { text: '', feedback: '' },
        { text: '', feedback: '' }
      ]
    };
    const newQuizzes = [...quizzes, newQuiz];
    setQuizzes(newQuizzes);
    onUpdateQuizContent(componentId, index, { ...component.content, quizzes: newQuizzes }, appId);
  };

  const handleRemoveQuiz = (quizIndex) => {
    const updatedQuizzes = quizzes.filter((_, idx) => idx !== quizIndex);
    setQuizzes(updatedQuizzes);
    onUpdateQuizContent(componentId, index, { ...component.content, quizzes: updatedQuizzes }, appId);
  };

  const updateQuizDetails = (quizIndex, optionIndex, field, value) => {
    const updatedQuizzes = quizzes.map((quiz, idx) => {
      if (idx === quizIndex) {
        if (optionIndex === null && field === 'question') {
          return { ...quiz, question: value };
        }
        const updatedOptions = quiz.options.map((option, optIdx) => {
          if (optIdx === optionIndex) {
            return { ...option, [field]: value };
          }
          return option;
        });
        return { ...quiz, options: updatedOptions };
      }
      return quiz;
    });
    setQuizzes(updatedQuizzes);
    onUpdateQuizContent(componentId, index, { ...component.content, quizzes: updatedQuizzes }, appId);
  };

  return (
    <div className="interactiveQuiz">
      <h2>Interactive Quiz</h2>
      {quizzes.map((quiz, quizIdx) => (
        <div key={quizIdx} className="quizContainer">
          <input
            type="text"
            placeholder="Insert your question here"
            value={quiz.question}
            onChange={(e) => updateQuizDetails(quizIdx, null, 'question', e.target.value)}
            className="quizInput"
          />
          {quiz.options.map((option, optionIdx) => (
            <div key={optionIdx} className="quizOption" style={{ marginBottom: '10px' }}> 
              <input
                type="text"
                placeholder={`Option ${optionIdx + 1}`}
                value={option.text}
                onChange={(e) => updateQuizDetails(quizIdx, optionIdx, 'text', e.target.value)}
                className="optionInput"
              />
              <input
                type="text"
                placeholder={`Feedback for Option ${optionIdx + 1}`}
                value={option.feedback}
                onChange={(e) => updateQuizDetails(quizIdx, optionIdx, 'feedback', e.target.value)}
                className="feedbackInput"
              />
            </div>
          ))}
          <button onClick={() => handleRemoveQuiz(quizIdx)}>Remove Question</button>
        </div>
      ))}
      <button onClick={handleAddQuiz}>Add Question</button>
    </div>
  );
};

export default InteractiveQuiz;
