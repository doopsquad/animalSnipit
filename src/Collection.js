import React from 'react'
import "./Style.css";
import { useLocation } from 'react-router-dom';


function Collection(props) {
    const location = useLocation();
    const animalData = location.state?.animalData || [];

  return (
    <div>
      <h1 id="collec-title">Your Bestiary 🦁</h1>
      <div className='bestiary-grid'>

      </div>
    </div>
  )
}

export default Collection
