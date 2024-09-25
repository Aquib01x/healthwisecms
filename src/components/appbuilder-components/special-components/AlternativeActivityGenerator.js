import React, { useState, useEffect } from 'react';

const AlternativeActivityGenerator = ({ component, onUpdateComponentContent, index, appId, componentId }) => {
  const [activities, setActivities] = useState(component.content.activities || [{ activity: '', info: '', goal: '' }]);

  useEffect(() => {
    setActivities(component.content.activities || [{ activity: '', info: '', goal: '' }]);
  }, [component.content.activities]);

  const handleAddActivity = () => {
    if (activities.length < 3) {
      setActivities([...activities, { activity: '', info: '', goal: '' }]);
    }
  };

  const handleRemoveActivity = (idx) => {
    const updatedActivities = activities.filter((_, activityIdx) => idx !== activityIdx);
    setActivities(updatedActivities);
    onUpdateComponentContent(componentId, index, { ...component.content, activities: updatedActivities }, appId);
  };

  const handleActivityChange = (e, idx, field) => {
    const updatedActivities = activities.map((activity, activityIdx) =>
      idx === activityIdx ? { ...activity, [field]: e.target.value } : activity
    );
    setActivities(updatedActivities);
    onUpdateComponentContent(componentId, index, { ...component.content, activities: updatedActivities }, appId);
  };
  return (
    <div className="alternativeActivityGenerator">
      <h2>Activity Generator</h2>
      {activities.map((activity, idx) => (
        <div key={idx} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Activity"
            value={activity.activity}
            onChange={(e) => handleActivityChange(e, idx, 'activity')}
          />
          <input
            type="text"
            placeholder="Information"
            value={activity.info}
            onChange={(e) => handleActivityChange(e, idx, 'info')}
          />
          <input
            type="text"
            placeholder="Initial Goal"
            value={activity.goal}
            onChange={(e) => handleActivityChange(e, idx, 'goal')}
          />
          <button onClick={() => handleRemoveActivity(idx)}>Remove</button> 
        </div>
      ))}
      {activities.length < 3 && <button onClick={handleAddActivity}>Add Activity</button>} 
    </div>
  );
};

export default AlternativeActivityGenerator;
