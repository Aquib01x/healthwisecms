import React, { useState, useEffect } from 'react';

const EvaluationQuiz = ({ component, onUpdateComponentContent, index, appId, componentId }) => {


  const [quizzes, setQuizzes] = useState(component.content.quizzes || [{
    question: '',
    sliderValue: 50,
    labels: ['Disagree', 'Neutral', 'Agree']
  }]);

  useEffect(() => {
    setQuizzes(component.content.quizzes || [{
      question: '',
      sliderValue: 50,
      labels: ['Disagree', 'Neutral', 'Agree']
    }]);
  }, [component.content.quizzes]);

  const handleAddQuiz = () => {
    if (quizzes.length < 3) {
      const newQuizzes = [...quizzes, { question: '', sliderValue: 50, labels: ['Disagree', 'Neutral', 'Agree'] }];
      setQuizzes(newQuizzes);
      onUpdateComponentContent(componentId, index, { ...component.content, quizzes: newQuizzes }, appId);
    }
  };

  const handleRemoveQuiz = (quizIndex) => {
    const filteredQuizzes = quizzes.filter((_, idx) => idx !== quizIndex);
    setQuizzes(filteredQuizzes);
    onUpdateComponentContent(componentId, index, { ...component.content, quizzes: filteredQuizzes }, appId);
  };

  const updateQuiz = (quizIndex, field, value) => {
    const updatedQuizzes = quizzes.map((quiz, idx) => {
      if (idx === quizIndex) {
        return { ...quiz, [field]: value };
      }
      return quiz;
    });
    setQuizzes(updatedQuizzes);
    onUpdateComponentContent(componentId, index, { ...component.content, quizzes: updatedQuizzes }, appId);
  };


  
  const updateLabels = (quizIndex, labelIndex, newValue) => {
    const updatedQuizzes = quizzes.map((quiz, idx) => {
      if (idx === quizIndex) {
        const updatedLabels = [...quiz.labels];
        updatedLabels[labelIndex] = newValue;
        return { ...quiz, labels: updatedLabels };
      }
      return quiz;
    });
    setQuizzes(updatedQuizzes);
    onUpdateComponentContent(componentId, index, { ...component.content, quizzes: updatedQuizzes }, appId);
  };
  return (
    <div className="evaluationQuiz">
      <h2>Evaluation Quiz</h2>
      {quizzes.map((quiz, quizIdx) => (
        <div key={quizIdx} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Insert your question here"
            value={quiz.question}
            onChange={(e) => updateQuiz(quizIdx, 'question', e.target.value)}
          />
          <div className="sliderContainer">
            <input
              type="range"
              min="0"
              max="100"
              value={quiz.sliderValue}
              onChange={(e) => updateQuiz(quizIdx, 'sliderValue', parseInt(e.target.value, 10))}
            />
            <div className="labels">
              {quiz.labels.map((label, labelIdx) => (
                <input
                  key={labelIdx}
                  type="text"
                  value={label}
                  onChange={(e) => updateLabels(quizIdx, labelIdx, e.target.value)}
                  placeholder={`Label ${labelIdx + 1}`}
                />
              ))}
            </div>
          </div>
          <button onClick={() => handleRemoveQuiz(quizIdx)}>Remove Question</button>
        </div>
      ))}
      {quizzes.length < 3 && <button onClick={handleAddQuiz}>Add Question</button>}
    </div>
  );
};

export default EvaluationQuiz;
