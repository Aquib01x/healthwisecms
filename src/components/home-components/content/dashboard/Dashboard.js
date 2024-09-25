import React, { useState } from 'react';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import './Dashboard.css'; 
import TodoList from './ToDoList.js'; 

function Dashboard() {

  const [date, setDate] = useState(new Date()); 


  return (
    <div className="contentBar">
      <div className="welcomeText">Hi, Welcome to Healthwise 👋
  </div>
      <div className="calendarContainer">
        <Calendar onChange={setDate} value={date} />
      </div>
      <div className="toDoList">
        <TodoList />
      </div>
    </div>
  );
}

export default Dashboard;
