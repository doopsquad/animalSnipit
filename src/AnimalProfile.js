import React, {useState} from 'react';
import "./Style.css";


function AnimalProfile(props) {


const results = () => {
  window.alert(`${props.name} wins!!!`)
}

return (
    <div className="profile">
      <h1 id="name">{props.name}</h1>
      <div className='media'>
      <img id="img" src={props.img} width="320" height="240" />
        <video
        id="video"
        controls
        source
        src={props.video}
        type="video/mp4"
        width="320"
        height="240"
        autoPlay
        loop
      />

      </div>
      <article id="info">
        {props.info}
      </article>

      <button id="vote" onClick={results}>VOTE!</button>
    </div>
    )
}

export default AnimalProfile;
