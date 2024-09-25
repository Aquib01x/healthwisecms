import React, { useState, useEffect } from 'react';
import LeftSideBar from '../components/appbuilder-components/appbuilder-interface/LeftSideBar.js';
import RightSideBar from '../components/appbuilder-components/appbuilder-interface/RightSideBar.js';
import MobileMockup from '../components/appbuilder-components/appbuilder-interface/MobileMockup.js';
import './AppBuilder.css';
import { useParams } from 'react-router-dom';
import handleAddComponent from '../utils/screenContentHandlers/handleAddComponent.js';
import handleRemoveComponent from '../utils/screenContentHandlers/handleRemoveComponent.js';
import handleMoveComponent from '../utils/screenContentHandlers/handleMoveComponent.js';
import addDefaultComponents from '../utils/serverRequestFunctions/addDefaultComponents.js';
import handleUpdateComponentContent from '../utils/screenContentHandlers/handleUpdateComponentContent.js';
import fetchComponents from '../utils/serverRequestFunctions/fetchComponents.js';
import logoImage from '../assets/icons/logo.png';

import backArrow from '../assets/icons/back.png';
import deleteBin from '../assets/icons/delete.png';
import { useNavigate } from 'react-router-dom';
import { useUserAuthContext } from "../hooks/useUserAuthContext.js";
import deleteApp from '../utils/serverRequestFunctions/deleteApp.js';
import InviteModal from '../components/appbuilder-components/other-components/InviteModal.js'; 
import QRCodeModal from '../components/appbuilder-components/other-components/QRCodeModal.js'; 

/**
 * `AppBuilder` is a React component that serves as a parent component,It manages the UI for building and 
 * configuring mobile applications, including a left sidebar for navigation, a mobile mockup display, and 
 * a right sidebar for adding components to the mockup. It also uses several hooks for state management,
 * including useState and useEffect, and interacts with utility functions for fetching, adding, moving, and 
 * deleting components.
 * It uses React Router's `useParams` to receive URL parameters,`useNavigate` for navigation,
 * and a custom hook `useUserAuthContext` for user authentication context.
 * `AppBuilder` has 5 child components: `LeftSideBar`, `RightSideBar`, `MobileMockup`, `InviteModal`, `QRCodeModal`
 * 
 * @component
 * @example
 * <AppBuilder />
 */

const AppBuilder = () => {

  const { appId, name } = useParams();

  const { user } = useUserAuthContext();//get user context 
  const navigate = useNavigate();

  const [headerText, setHeaderText] = useState('home');
  
  const [showInviteModal, setShowInviteModal] = useState(false);

  const [showQRModal, setShowQRModal] = useState(false);

  //manage the state of components on the screen

  const [screenComponents, setScreenComponents] = useState({

    home: [],
    guidelines: [],
    precontemplation: [],
    contemplation: [],
    preparation: [],
    action: [],
    maintenance: [],

  });


 

//Handler fucntion to manage app deletions
  const handleDelete = (appId) => {
    deleteApp(appId, user)
      .then(() => {
      
        console.log('App deleted');
    
//navigate to home page once deleted
        navigate('/home');
      })
      .catch((error) => {
        // Handle error case
        console.error('Failed to delete app:', error);
        alert('Failed to delete the app.');
      });
  };



  //toggle the visibility
  const toggleQRModal = () => setShowQRModal(!showQRModal);



  console.log(screenComponents)
  console.log("app id " + appId)

  //API OPS
  useEffect(() => {

    if (!appId) {
      navigate('/error');
    }


    const savedScreen = sessionStorage.getItem('currentScreen');
    if (savedScreen) {
      setHeaderText(savedScreen);
    }

    if (user) {//if the user is logged in fetch components

      fetchComponents(setScreenComponents, addDefaultComponents, handleAddComponent, appId, user);
    }

  }, [appId, user, navigate]);


  const MAX_COMPONENTS = 15

  const checkComponentCount = (componentType) => {

    const currentComponentsCount = screenComponents[headerText].length;

    if (currentComponentsCount >= MAX_COMPONENTS) {
      alert("Massimo numero di componenti raggiunto.");
      return;
    }


    handleAddComponent(componentType, setScreenComponents, headerText, appId, user);
  };



  //returns to same screen on Reload
  const changeScreen = (newScreen) => {
    setHeaderText(newScreen); // Updates the state using new headerText
    sessionStorage.setItem('currentScreen', newScreen); // Saves currentScreen to sessionStorage
  };

  const MoveComponent = async (componentId, direction) => {
    await handleMoveComponent(componentId, direction, setScreenComponents, headerText, appId, user);
  };


  const navigateToHomePage = () => {
    navigate('/home');
  };

  return (


    <div id="cont">



      <div className='topSection'>
    

        <div onClick={navigateToHomePage} className="navigate-back" style={{ cursor: 'pointer' }}>

          <img src={backArrow} alt="BackArrow" style={{ width: '30px', height: '30px', marginLeft: '25px', marginRight: '30px', marginTop: '5px' }} />    </div>

        <button type="submit" className="topRightButton publishButton" onClick={() => setShowInviteModal(true)}>Publish</button>


          
      
        <button className="topRightButton previewButton" type="button" onClick={toggleQRModal} >Preview</button>
       
        <div className='appInfoSection'>

          <span style={{ marginLeft: '10px' }}>{name}</span>
          <img src={logoImage} alt="Logo" style={{ width: '30px', height: '30px', marginLeft: '10px', marginRight: '5px',borderRadius: '20px' }} />

        </div>
        <button onClick={() => handleDelete(appId)} className="deleteAppButton">

        <img src={deleteBin} alt="Delete" className="deleteAppIcon" />
        </button>

      </div>


      <LeftSideBar onButtonClick={changeScreen} />

      <MobileMockup
        headerText={headerText} components={screenComponents[headerText]}
        onMoveComponent={(componentId, direction) => MoveComponent(componentId, direction)}
        onRemoveComponent={(index) => handleRemoveComponent(index, setScreenComponents, headerText, appId, user)}
        onUpdateComponentContent={(componentId, index, newContent) => handleUpdateComponentContent(componentId, index, newContent, setScreenComponents, headerText, appId, user)}
        appId={appId}
      />

      <RightSideBar
        headerText={headerText}
        onAddComponent={checkComponentCount}
      />

      <InviteModal
        showModal={showInviteModal}
        appId={appId}
        user={user}
        setShowModal={setShowInviteModal}
      />

      <QRCodeModal
        showQRModal={showQRModal}
        toggleQRModal={toggleQRModal}
        appId={appId} />


    </div>
  )
}


export default AppBuilder;