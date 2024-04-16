import React, { useState, useEffect } from "react";
import AnimalProfile from "./AnimalProfile";
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, child, push } from "firebase/database";
import "./Style.css";
import { v4 as uuidv4 } from 'uuid';

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
const database = getDatabase(app);
const TIME_REMAINING = 20;

function App() {
  const [animalData, setAnimalData] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(TIME_REMAINING);
  const [topIndex, setTopIndex] = useState(null);
  const [bottomIndex, setBottomIndex] = useState(null);
  const navigate = useNavigate();
  const [match, setMatch] = useState(false);
  const [newUserId, setNewUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(child(ref(database), 'unclaimed'));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const animalsArray = Object.values(data);
          setAnimalData(animalsArray);
          const initialTopIndex = Math.floor(Math.random() * animalsArray.length);
          const initialBottomIndex = Math.floor(Math.random() * animalsArray.length);
          setTopIndex(initialTopIndex);
          setBottomIndex(initialBottomIndex);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (!animalData.length) {
    fetchData(); }
  }, [animalData]);

  useEffect(() => {
    let timer;
    if (timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else {
      navigate('/collection', {
        state: {
          animalData,
          userId: newUserId // Pass the newUserId state variable
        }
      });
    }
    return () => {
      clearInterval(timer);
    };
  }, [timeRemaining, navigate, newUserId]);

  const getNextIndex = () => {
    let newIndex;
    newIndex = Math.floor(Math.random() * animalData.length);
    return newIndex;
  };

  const generateUserId = () => {
    if (!localStorage.getItem("userId")) {
      const userId = uuidv4();
      localStorage.setItem("userId", userId);
    }
  };

  useEffect(() => {
    generateUserId();
  }, []);
  


  const voteBottom = () => {
    const newTopIndex = getNextIndex();
    setTopIndex(newTopIndex);
    if (newTopIndex === bottomIndex) {
      setMatch(true);
      const userId = localStorage.getItem("userId");
      const usersRef = ref(database, `/users/${userId}`);
      push(usersRef, {
        name: animalData[bottomIndex].name,
        img: animalData[bottomIndex].img,
      });
      const matchedAnimalsRef = ref(database, 'matchedAnimals');
      push(matchedAnimalsRef, {
        name: animalData[topIndex].name,
        img: animalData[topIndex].img,
        userId: userId,
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
      const userId = localStorage.getItem("userId");
      const usersRef = ref(database, `/users/${userId}`);
      push(usersRef, {
        name: animalData[topIndex].name,
        img: animalData[topIndex].img,
      });
      const matchedAnimalsRef = ref(database, 'matchedAnimals');
      push(matchedAnimalsRef, {
        name: animalData[topIndex].name,
        img: animalData[topIndex].img,
        userId: userId,
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
      <AnimalProfile img={bottomAnimal.img} name={bottomAnimal.name} isSame={match} />
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
