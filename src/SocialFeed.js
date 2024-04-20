import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';


function SocialFeed() {
  const [matchedAnimals, setMatchedAnimals] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const matchedAnimalsRef = ref(db, 'matchedAnimals');
    onValue(matchedAnimalsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const animalsArray = Object.values(data);
        setMatchedAnimals(animalsArray);
      }
    });
  }, []);

  return (
    <div className='feed'>
      <h2 id="feed-title">Social Feed</h2>
      {matchedAnimals.map((animal, index) => (
        <div id="feed-info" key={index}>
          <img id="feed-pic"src={animal.img} alt={animal.name} />
          <p id="animal-name-feed">{animal.name}</p>
          <p id="match-info">Matched by: {animal.userId}</p>
        </div>
      ))}
      <Link to="/">
        <button className='feed-btn'>Go Home</button>
      </Link>
    </div>
  );
}

export default SocialFeed;