import React, { useState, useEffect } from 'react';
import fetchParticipants from '../../../../utils/serverRequestFunctions/fetchPartecipants.js'; 
import { useUserAuthContext } from "../../../../hooks/useUserAuthContext.js";

const Participants = () => {
  const [participants, setParticipants] = useState([]);

  const {user} = useUserAuthContext();

  useEffect(() => {
    if(user.email && user) {
      fetchParticipants(user.email, user)
        .then(data => {
          console.log(data);
          setParticipants(data);
        })
        .catch(error => {
          console.error('Error fetching participants:', error);
        });
    }
  }, [user]);
 
  const filterAppNames = (nameOrId) => {
    return isNaN(nameOrId.charAt(0));
  };

  return (
    <div>
      <h1 style={{ marginTop: '94px', marginBottom: '100px', marginLeft: '30px', fontSize: '25px', fontWeight: 'bold' }}>Participants</h1>
      <div className='participantsContainer'>
        <ul>
          {participants.map((participant) => (
            <li key={participant._id}>
              <strong>Participant:</strong> {participant.email}
              <br />
              <strong>Apps Invited To:</strong>
              <ul>
                {participant.appsInvitedTo.filter(filterAppNames).map((appName, index) => (
                  <li key={index}>{appName}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Participants;

