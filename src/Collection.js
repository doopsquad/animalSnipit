import React, { useState, useEffect } from "react";
import "./Style.css";
import { Link } from 'react-router-dom';
import { getDatabase, ref, get } from "firebase/database";

function Collection() {
  const [animalData, setAnimalData] = useState({});
  const userId = localStorage.getItem("userId");

  console.log("userId:", userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        console.log("Fetching data for userId:", userId); // Log the userId
        const snapshot = await get(ref(db, `/users/${userId}`));
        console.log("Snapshot:", snapshot.val()); // Log the snapshot value
        if (snapshot.exists()) {
          const data = snapshot.val();
          setAnimalData(data);
          console.log("animalData:", data);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error); // Log any errors
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