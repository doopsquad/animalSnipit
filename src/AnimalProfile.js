import React, {useState} from 'react';
import "./Style.css";


function AnimalProfile(props) {


const results = () => {
  window.alert(`${props.name} wins!!!`)
}

return (
    <div className="profile">
      <img id="img" src={props.img} onClick={results} />
      <h1 id="name">{props.name}</h1>
    </div>
    )
}

export default AnimalProfile;
