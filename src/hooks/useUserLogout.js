import { useUserAuthContext } from './useUserAuthContext'; 


export const useUserLogout = () => {
  const { dispatch } = useUserAuthContext(); // Destructure dispatch method from the auth context


  const performLogout = () => {
    localStorage.removeItem('user'); 

    dispatch({ type: 'LOGOUT' });
  };

 
  return { logout: performLogout };
};