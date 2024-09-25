
import { createContext, useReducer, useEffect } from 'react';

// Define the initial state for user authentication
const initialState = { user: null };

// Create a context for user auth state and dispatch method
export const UserAuthContext = createContext(initialState);

// Reducer function for updating auth state based on actions
const userAuthReducer = (currentState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...currentState, user: action.payload }; // Update user on login
    case 'LOGOUT':
      return { ...currentState, user: null }; // Clear user on logout
    default:
      return currentState; // Return current state if action does not match
  }
};

// Context provider component for user authentication
export const UserAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userAuthReducer, initialState);

  // Effect to initialize user state from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // Dispatch login action with stored user data if found
      dispatch({ type: 'LOGIN', payload: JSON.parse(storedUser) });
    }
  }, []); 

  // Provide auth state and dispatch to the component tree
  return (
    <UserAuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserAuthContext.Provider>
  );
};
