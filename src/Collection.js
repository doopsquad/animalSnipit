import React, { useState, useEffect } from "react";
import "./Style.css";
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from "firebase/database";

function Collection() {
  const [animalData, setAnimalData] = useState({});
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = () => {
      try {
        const db = getDatabase();
        const userRef = ref(db, `/users/${userId}`);

        onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setAnimalData(data);
          } else {
            setAnimalData({});
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userId) { 
      fetchData();
    }
  }, [userId]);

  return (
    <div className="collec">
      <h1 id="collec-title">Your Bestiary 🦁</h1>
      <div className='placeholder'>
        {Object.entries(animalData).map(([animalKey, animalValue]) => (
          <div key={animalKey}>
            <h2 id="animal-name">{animalValue.name}</h2>
            <img id="animal-pic" src={animalValue.img} alt={animalValue.name} />
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