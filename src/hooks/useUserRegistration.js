import { useState } from 'react';
import { useUserAuthContext } from './useUserAuthContext'; 


export function useUserRegistration() {
 

  const [signupError, setSignupError] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const authContext = useUserAuthContext();

  // Function to register the user with email and password
  async function registerUser(email, password) {
    setIsSubmitting(true); 
    setSignupError(null); 

    try {
      // Perform the API request to the signup endpoint
      const res = await fetch('https://devweb2023.cis.strath.ac.uk/fqb19176-nodejs/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
       
        throw new Error(data.error || 'Could not complete signup');
      }

      // On successful registration, save the user data in local storage
      localStorage.setItem('user', JSON.stringify(data));

      authContext.dispatch({ type: 'LOGIN', payload: data });
    } catch (err) {
      

      setSignupError(err.message);
    } finally {
  
      setIsSubmitting(false);
    }
  }

  
  return { registerUser, isSubmitting, signupError };
}