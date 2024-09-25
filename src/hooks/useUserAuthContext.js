

import { useContext } from "react";
import { UserAuthContext } from "../context/UserAuthContext"; 


export const useUserAuthContext = () => {

  const userContext = useContext(UserAuthContext); 

  if (!userContext) {
    throw Error('useUserAuthContext must be used within a UserAuthProvider');
  }

  return userContext;
};