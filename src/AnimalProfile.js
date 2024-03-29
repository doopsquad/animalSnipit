import React, {useState} from 'react';
import "./Style.css";


function AnimalProfile(props) {

return (
    <div className="profile">
      <img id="img" src={props.img} />
      <h1 id="name">{props.name}</h1>
    </div>
    )
}

export default AnimalProfile;
