/*
Goals for 4/11:
Make it so that the player's animals are saved from the previous game and show up in the next game's bestiary (major)
Add a few more animals (minor)
Take animals out of the game if user already caught (major)
Change first two animals (major)

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
