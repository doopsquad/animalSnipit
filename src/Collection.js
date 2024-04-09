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
        const snapshot = await get(ref(db, `/users/${userId}`));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setAnimalData(data);
          console.log("animalData:", data);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error(error);
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
            <h2 id="animal-name">{animalData.name}</h2>
            <img id="animal-pic" src={animalData.img} alt={animalData.name} />
      </div>
      <Link to="/">
        <button id="collec-home">Go Back Home</button>
      </Link>
    </div>
  );
}

export default Collection;