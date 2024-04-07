import React, { useState, useEffect } from "react";
import AnimalProfile from "./AnimalProfile";
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, child, push } from "firebase/database";
import "./Style.css";

const firebaseConfig = {
  apiKey: "AIzaSyANjqQtZm7hPqmHl1ilgApWDRkRRqf5S-0",
  authDomain: "animal-snipet.firebaseapp.com",
  projectId: "animal-snipet",
  storageBucket: "animal-snipet.appspot.com",
  messagingSenderId: "137804291186",
  appId: "1:137804291186:web:f98ace37b6415e271c36eb",
  measurementId: "G-69WQ6RGC1L"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
const TIME_REMAINING = 10;

function App() {
  const [animalData, setAnimalData] = useState([]);
  const [topIndex, setTopIndex] = useState(Math.floor(Math.random() * animalData.length));
  const [bottomIndex, setBottomIndex] = useState(Math.floor(Math.random() * animalData.length));
  const [timeRemaining, setTimeRemaining] = useState(TIME_REMAINING);
  const navigate = useNavigate();
  const [match, setMatch] = useState(false);

  useEffect(() => {
    let timer;

    const fetchData = async () => {
      try {
        const snapshot = await get(child(ref(database), 'unclaimed'));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const animalsArray = Object.values(data);
          setAnimalData(animalsArray);
          console.log(animalData);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    if (timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else {
      navigate('/collection', { state: { animalData } });
    }

    return () => clearInterval(timer);
  }, [timeRemaining, navigate]);

  const getNextIndex = () => {
    let newIndex;
    newIndex = Math.floor(Math.random() * animalData.length);
    return newIndex;
  };

  const voteBottom = () => {
    const newTopIndex = getNextIndex();
    setTopIndex(newTopIndex);
  
    if (newTopIndex === bottomIndex) {
      setMatch(true);
  
      const claimedRef = ref(database, "/claimed");
      const newClaimedRef = push(claimedRef);
      set(newClaimedRef, {
        name: animalData[bottomIndex].name,
        img: animalData[bottomIndex].img,
        // Add other properties you want to include
      });
    } else {
      setMatch(false);
    }
  };
  
  const voteTop = () => {
    const newBottomIndex = getNextIndex();
    setBottomIndex(newBottomIndex);
  
    if (topIndex === newBottomIndex) {
      setMatch(true);
  
      const claimedRef = ref(database, "/claimed");
      const newClaimedRef = push(claimedRef);
      set(newClaimedRef, {
        name: animalData[topIndex].name,
        img: animalData[topIndex].img,
        // Add other properties you want to include
      });
    } else {
      setMatch(false);
    }
  };


  const topAnimal = animalData[topIndex] || {};
  const bottomAnimal = animalData[bottomIndex] || {};

  return (
    <div className="App">
      <AnimalProfile img={topAnimal.img} name={topAnimal.name} isSame={match} />
      <AnimalProfile img={bottomAnimal.img} name={bottomAnimal.name} isSame={match}  />
      <h1 id="animalCounter">{animalData.length}</h1>
      <div id="buttonHolder">
        <button id="btnLeft" className="button" onClick={voteTop}>
          Change Bottom
        </button>
        <button id="btnRight" className="button" onClick={voteBottom}>
          Change Top
        </button>
      </div>
      <h1 id="time-limit">Time Remaining: {timeRemaining}</h1>
    </div>
  );
}

export default App;
