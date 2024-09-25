import React, { useState, useEffect } from 'react';

const GoalSetter = ({ component, index }) => {

  const [goals, setGoals] = useState(component.content.goals || [{
    goalDescription: '',
    measureOfSuccess: '',
    deadline: ''
  }]);

  useEffect(() => {

    setGoals(component.content.goals || [{
      goalDescription: '',
      measureOfSuccess: '',
      deadline: ''
    }]);
  }, [component.content.goals]);

  const handleAddGoal = () => {
    if (goals.length < 3) {
      const newGoals = [...goals, { goalDescription: '', measureOfSuccess: '', deadline: '' }];
      setGoals(newGoals);
    }
  };

  const handleRemoveGoal = (goalIndex) => {
    const filteredGoals = goals.filter((_, idx) => idx !== goalIndex);
    setGoals(filteredGoals);
  };



  return (
    <div className="goalSetter">
      <h2>Set a Goal</h2>
      {goals.map((goal, goalIdx) => (
        <div key={goalIdx} style={{ marginBottom: '20px' }}> 
          <input
            type="text"
            placeholder="Describe your goal"
            value={goal.goalDescription}
          />
          <input
            type="text"
            placeholder="How will you measure success?"
            value={goal.measureOfSuccess}
          />
          <input
            type="date"
            value={goal.deadline}
          />
          <button onClick={() => handleRemoveGoal(goalIdx)}>Remove Goal</button> 
        </div>
      ))}
      {goals.length < 3 && <button onClick={handleAddGoal}>Add Goal</button>} 
    </div>
  );
};

export default GoalSetter;
