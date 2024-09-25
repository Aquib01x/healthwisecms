import { useState } from "react";
import { useUserRegistration } from "../../hooks/useUserRegistration"; 
import './Forms.css';


/**
 * The `Signup`  component allows reseachers to sign up to the application
 * It presents a form where users can input their email address and password to sign up for an account.
 * It utilizes a  custom hook `useUserRegistration`to handle the registration logic. 
 * The `useUserRegistration` hook provides the `registerUser` function to perform the signup operation,
 * `isSubmitting` to indicate the ongoing submission process, and `signupError` for any error feedbackd
 * 
 * @component
 * @example
 * 
 * <Signup />
 * 
 */


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { registerUser, isSubmitting, signupError } = useUserRegistration();


  //handle registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(email, password); 
  };

  return (
    <div className="Contain">
    <form className="formContainer" onSubmit={handleSubmit}>
        <h1>Healthwise CMS</h1>
        <h3>Sign Up</h3>
        
        <label>Email address:</label>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
        />
        <label>Password:</label>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />

        <button disabled={isSubmitting}>Sign up</button> 
        {signupError && <div className="error">{signupError}</div>}
    </form>
    </div>
  );
}

export default Signup;
