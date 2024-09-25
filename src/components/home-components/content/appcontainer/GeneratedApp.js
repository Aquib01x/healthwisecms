import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GeneratedApp.css';
import logo from '../../../../assets/icons/logo.png';

const GeneratedApp = ({ _id, name }) => {
  const navigate = useNavigate();

  const onAppClick = () => {
    navigate(`/appbuilder/${name}/${_id}`);
  };

  return (
    <div className="appDisplay" onClick={onAppClick}>
      <img src={logo} alt="logo" id="croppedLogo" />
      <h3 id="Name">{name}</h3>
    </div>
  );
};

export default GeneratedApp;
