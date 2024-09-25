import React, { useState } from 'react';
import './ToDoList.css'; 

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, newTask]);
    setNewTask('');
  };

  const handleRemoveTask = (index) => {
    setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
  };

  return (
    <div className="todoListContainer">
      <h2 className="todoListTitle">To-Do List</h2>
      <div className="inputContainer">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="taskInput"
          placeholder="Add task.."
        />
        <button className="addTaskButton" onClick={handleAddTask}>+</button>
      </div>
      <ul className="taskList">
        {tasks.map((task, index) => (
          <li key={index} className="taskItem">
            {task}
            <span className="removeTaskButton" onClick={() => handleRemoveTask(index)}>🗑️</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
