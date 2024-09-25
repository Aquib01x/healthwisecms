import { useState } from "react";
import { useUserLogin } from "../../hooks/useUserLogin"; 
import './Forms.css';


/**
 * The `Login` component  renders a login form for reseachers to login to the application 
 * It utilizes the `a custom `useUserLogin` to handle the login logic, which includes
 * the authentication process and error handling
 *
 * @component
 * @example 
 * <Login />
 */


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser, isLoginPending, loginError } = useUserLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(email, password); 
  };

  return (
    <div className="Contain">
    <form className="formContainer" onSubmit={handleSubmit}>
      <h1>Healthwise CMS</h1>
      <h3>Log In</h3>

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

      <button disabled={isLoginPending}>Log in</button> 
      {loginError && <div className="error">{loginError}</div>}
    </form>
    </div>
  );
}

export default Login;
