import React,{useState} from 'react';
import './CreateApp.css'; 
import AppGenForm from './CreateAppForm'; 

import PlusButton from '../../../../assets/icons/plusbutton.png';


const CreateApp = ({onAddApp}) => {

  
  
  const [visible, setVisible] = useState(
    JSON.parse(sessionStorage.getItem('formVisible')) || false
  );

  const onClick = () => {
    
      setVisible(true);
      sessionStorage.setItem('formVisible', true); 

      
 };

 const clearFormData = () => {
 
  sessionStorage.removeItem('appName');
  sessionStorage.removeItem('appDesc');
};


  const onClose = () => {
   
      setVisible(false);
      sessionStorage.setItem('formVisible', false);
      clearFormData();
     
  
};

  return (
    <div className="createApp" onClick={onClick}>
  
      <img src={PlusButton} alt="Plus Button" id="plusBtnImg" />
      <h3 id = "createApp">New App</h3>
 

    {visible && <AppGenForm onClose={onClose} onAddApp={onAddApp} />}

        </div>
      );
    };

  


export default CreateApp;