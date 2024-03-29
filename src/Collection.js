import React from 'react'
import "./Style.css";
import { useLocation } from 'react-router-dom';


function Collection(props) {
    const location = useLocation();
    const animalData = location.state?.animalData || [];

    let favorite;

    for (let x = 0; x < animalData.length; x++) {
        if (x == 0 || animalData[x].result > animalData[x - 1].result) {
            favorite = animalData[x];
        }
    }

  return (
    <div>
      <h1 id="collec-title">Your Bestiary 🦁</h1>
      <div className='placeholder'>
        <h1 id="animal-name">{favorite.name}</h1>
        <img id="animal-pic" src={favorite.img}></img>
      </div>
    </div>
  )
}

export default Collection
