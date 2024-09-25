import React from 'react';
import { HashRouter as Router, Routes, Route,Navigate  } from 'react-router-dom';


import { useUserAuthContext } from './hooks/useUserAuthContext'


import UserHandler from './pages/UserHandler'; 

import ErrorPage from './components/home-components/content/appcontainer/ErrorPage';

import Home from './pages/Home';
import AppBuilderPage from './pages/AppBuilder'; 

import Mobile from './pages/Mobile';
import PasswordReset from './components/userhandler-components/PasswordReset'
import './index.css';


function App() {


  const { user } = useUserAuthContext()




  return (
    <div className="App">


      <Router>
        <Routes>



        <Route path="/" element={ !user ? <UserHandler /> : <Navigate to="/home" />} />


        <Route path="/reset-password/:token" element={ <PasswordReset />} />


       
        <Route path="/home" element={ user ? <Home/> : <Navigate to="/" /> } />
       
        
        <Route path="/appbuilder/:name/:appId" element={!user ? <UserHandler /> : <AppBuilderPage/>} />
        <Route path="/mobile/:appId" element={<Mobile />} />
     

     
        <Route path="/*" element={<ErrorPage/>} />
        <Route path="/error" element={<ErrorPage/>} />
      
        </Routes>
      </Router>
    </div>
  );
}

export default App