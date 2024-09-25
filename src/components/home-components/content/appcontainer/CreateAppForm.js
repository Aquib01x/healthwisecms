import React, { useState,useEffect } from 'react';
import './CreateAppForm.css'; 
import { useNavigate } from 'react-router-dom'; 

import { useUserAuthContext } from "../../../../hooks/useUserAuthContext.js";



const CreateAppForm = ({onClose,onAddApp}) => {

  const {user} = useUserAuthContext();//auth


  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const [errors, setErrors] = useState({ name: '', desc: '' });

  

  const navigate = useNavigate(); 
  useEffect(() => {
    const savedName = sessionStorage.getItem('appName');
    const savedDesc = sessionStorage.getItem('appDesc');
    if (savedName) setName(savedName);
    if (savedDesc) setDesc(savedDesc);
  }, []);


  useEffect(() => {
    sessionStorage.setItem('appName', name);
  }, [name]);

  useEffect(() => {
    sessionStorage.setItem('appDesc', desc);
  }, [desc]);



  const validateForm = () => {
    let isValid = true;
    let errors = { name: '', desc: '' };

    if (name.length < 3 || name.length > 20) {
      errors.name = 'App Name must be between 5 and 10 characters.';
      isValid = false;
    }

    if (desc.length < 10 || desc.length > 100) {
      errors.desc = 'Description must be between 10 and 100 characters.';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };



  const submitHandler = (event) => {
    event.preventDefault();


    if (!validateForm()) {
      return; 
    }


    const postData = { name,desc, };

    console.log('Dati inviati:', postData);



    if (user) {
      postingData(postData);
    }


  };

  const postingData = (formData)=>{
    

    fetch('https://devweb2023.cis.strath.ac.uk/fqb19176-nodejs/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(formData),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('There was an issue');
      }
      console.log('Success!');
      return response.json();
    })
    .then(data => {
      onAddApp(formData); 
      onClose(); 

   

      navigate(`/appbuilder/${data.name}/${data._id}`); 


      onClose(); 
    })
    .catch((error) => {
      console.error('Error:', error);
    });



  }
  


  return (
    <div className="appContainer"> 

    <form onSubmit={submitHandler} id="form">
  <div className="formGroup">
  <h2 style={{ textAlign: 'center', marginBottom: '20px',marginTop: '0px' }}>New App</h2> 

    <label className="formLabel">App Name:</label>
    <input
      name="appname"
      type="text"
      value={name}
      onChange={(event) => setName(event.target.value)}
      className="inputBox"
    />

  </div>

  <div className="formGroup">
    <label className="formLabel">Description:</label>
    <input
      name="description"
      type="text"
      value={desc}
      onChange={(event) => setDesc(event.target.value)}
      className="textareaInput"
    />
 
  </div>
      <div id="buttonsContainer">
      <button type="submit" id="submitButton" className="formButton">Submit</button> 
      <br/>
      <button type = "button" className = "formButton" onClick={(event) => {
  event.stopPropagation(); // Prevent click from propagating
  onClose(); }}>Close</button>
  </div>
    </form>
    </div>
  );
  
  }
export default CreateAppForm;

