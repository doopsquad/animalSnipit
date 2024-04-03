import React from 'react';
import "./Style.css";
import { useLocation, Link } from 'react-router-dom';

function Collection() {
  const location = useLocation();
  const animalData = location.state?.animalData || [];

  let favorite = {};

  for (let x = 0; x < animalData.length; x++) {
    const currentAnimal = animalData[x];
    const prevAnimal = animalData[x - 1];
    console.log(animalData[x].result);
    if (x === 0 || (currentAnimal.result >= (prevAnimal?.result || 0))) {
      favorite = currentAnimal;
    }
  }

  return (
    <div>
      <h1 id="collec-title">Your Bestiary 🦁</h1>

      {/* Check if favorite is not an empty object */}
      {Object.keys(favorite).length > 0 ? (
        <div className='placeholder'>
          <h1 id="animal-name">{favorite != null && favorite.name}</h1>
          <img id="animal-pic" src={favorite.img}/>
        </div>
      ) : (
        <p>No animals found.</p>
      )}

      <Link to="/">
        <button id="collec-home">Go Back Home</button>
      </Link>
    </div>
  );
}

export default Collection;
