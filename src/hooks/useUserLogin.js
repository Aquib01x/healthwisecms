import { useState } from 'react';
import { useUserAuthContext } from './useUserAuthContext';
import { useNavigate } from 'react-router-dom'; 


export const useUserLogin = () => {
  const navigate = useNavigate(); 
  const [loginError, setLoginError] = useState(null); 
  const [isLoginPending, setLoginPending] = useState(false); 
  const { dispatch } = useUserAuthContext(); 

  // Function to perform login
  const loginUser = async (email, password) => {
    setLoginPending(true); 
    setLoginError(null); 

    
    try {
      const response = await fetch('https://devweb2023.cis.strath.ac.uk/fqb19176-nodejs/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), 
      });
      const json = await response.json(); 

      if (!response.ok) {
        throw new Error(json.error); 
      }

      localStorage.setItem('user', JSON.stringify(json)); 
      dispatch({ type: 'LOGIN', payload: json }); 

      navigate('/home'); 
    } catch (error) {
      setLoginError(error.message); 
    } finally {
      setLoginPending(false); 
    }
  };

  
  return { loginUser, isLoginPending, loginError };
};