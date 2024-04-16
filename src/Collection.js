import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from "firebase/database";

function Collection() {
  const [animalData, setAnimalData] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = () => {
      try {
        const db = getDatabase();
        const userRef = ref(db, `/users/${userId}`);

        onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            // Convert the object of animals to an array
            const animalsArray = Object.values(data);
            setAnimalData(animalsArray);
          } else {
            setAnimalData([]);
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

  // Function to filter out duplicates based on animal name
  const getUniqueAnimals = (animals) => {
    const uniqueAnimals = [];
    const animalNames = new Set(); // Set to store unique animal names

    animals.forEach(animal => {
      if (!animalNames.has(animal.name)) {
        uniqueAnimals.push(animal);
        animalNames.add(animal.name);
      }
    });

    return uniqueAnimals;
  };

  const uniqueAnimalData = getUniqueAnimals(animalData);

  return (
    <div className="collec">
      <h1 id="collec-title">Your Bestiary 🦁</h1>
      <div className='placeholder'>
        {uniqueAnimalData.map((animal, index) => (
          <div key={index}>
            <h2 id="animal-name">{animal.name}</h2>
            <img id="animal-pic" src={animal.img} alt={animal.name} />
          </div>
        ))}
      </div>
      <Link to="/">
        <button id="collec-home" className="collec-btn">Go Back Home</button>
      </Link>
      <Link to="/feed">
        <button id="collec-feed" className="collec-btn">Go to Feed</button>
      </Link>
    </div>
  );
}

export default Collection;
