import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { UserAuthProvider } from './context/UserAuthContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <UserAuthProvider>
    <App />
    </UserAuthProvider>

);


