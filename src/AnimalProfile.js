/*
Goals for 


Find out how to utilize cookies for user's usernames
Instead of randomass numbers for user ids, let users make usernames

*/

import React, {useState} from 'react';
import "./Style.css";


function AnimalProfile({ img, name, isSame }) {
  return (
    <div className={`animal-profile ${isSame ? 'bulge' : ''}`}>
      <img id="img" src={img} alt={name} />
      <p id="name">{name}</p>
    </div>
  );
}

export default AnimalProfile;
