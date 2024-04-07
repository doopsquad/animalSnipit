import React, { useState, useEffect } from "react";
import "./Style.css";
import { Link } from 'react-router-dom';
import { getDatabase, ref, set, get, child } from "firebase/database";

const database = getDatabase();

function Collection() {
  const [animalData, setAnimalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(child(ref(database), 'claimed'));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const animalsArray = Object.values(data);
          setAnimalData(animalsArray);
          console.log("animal data - ", animalData);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="collec">
    <h1 id="collec-title">Your Bestiary 🦁</h1>
    <div className='placeholder'>
      {animalData.map((animal, index) => (
        <div key={index}>
          <h2 id="animal-name">{animal.name}</h2>
          <img id="animal-pic" src={animal.img} alt={animal.name} />
        </div>
      ))}
    </div>
    <Link to="/">
      <button id="collec-home">Go Back Home</button>
    </Link>
    </div>
  );
}

export default Collection;