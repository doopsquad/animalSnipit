import React, { useState, useEffect, } from "react";
import { debounce } from 'lodash';
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

  const getRandIndex = (animalData) => Math.floor(Math.random() * animalData.length);
  
  const [animalData, setAnimalData] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(TIME_REMAINING);
  const navigate = useNavigate();
  const [match, setMatch] = useState(false);
  const [newUserId, setNewUserId] = useState(null);
  const [randIndex1, setRandIndex1] = React.useState(() => getRandIndex(animalData));
  const [randIndex2, setRandIndex2] = React.useState(() => getRandIndex(animalData));
  const [matchedAnimals, setMatchedAnimals] = useState([]);

  let userId;
  const generateUserId = () => {
    if (!localStorage.getItem("userId")) {
       userId = uuidv4();
      localStorage.setItem("userId", userId);
    }
  };

  useEffect(() => {
    generateUserId();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(child(ref(database), 'unclaimed'));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const animalsArray = Object.values(data);
          setAnimalData(animalsArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (!animalData.length) {
      fetchData();
    }
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


const voteBottom = debounce(() => {
  setRandIndex1(getRandIndex(animalData));
})

const voteTop = debounce(() => {
  setRandIndex2(getRandIndex(animalData));
})

useEffect(() => {
  if (animalData.length && randIndex1 === randIndex2) {
    const matched = animalData[randIndex1];
    const userId = localStorage.getItem("userId");
    const usersRef = ref(database, `/users/${userId}`);
    push(usersRef, {
      name: animalData[randIndex2].name,
      img: animalData[randIndex2].img,
    });
    const matchedAnimalsRef = ref(database, 'matchedAnimals');
    push(matchedAnimalsRef, {
      name: animalData[randIndex2].name,
      img: animalData[randIndex2].img,
      userId: userId,
    });
    const nextAnimals = animalData.toSpliced(randIndex1, 1);
    setAnimalData(nextAnimals);
    setMatchedAnimals((matchedAnimals) => matchedAnimals.concat(matched));
    setRandIndex1(getRandIndex(nextAnimals));
    setRandIndex2(getRandIndex(nextAnimals));
  }
}, [animalData, randIndex1, randIndex2]);

  const topAnimal = animalData[randIndex1] || {};
  const bottomAnimal = animalData[randIndex2] || {};

  useEffect(() => {
    let timer;
    if (match) {
      timer = setTimeout(() => {
        setMatch(false);
      }, 1000); // Adjust the duration based on your animation length
    }
    return () => {
      clearTimeout(timer);
    };
  }, [match]);

  const reset = () => {
    setAnimalData(animalData);
    setMatchedAnimals([]);
    setRandIndex1(getRandIndex(animalData));
    setRandIndex2(getRandIndex(animalData));
  };

  return (
    <div className="App">
      <AnimalProfile img={topAnimal.img} name={topAnimal.name} isSame={match} />
      <AnimalProfile img={bottomAnimal.img} name={bottomAnimal.name} isSame={match} />
      <h1 id="animalCounter">{animalData.length}</h1>
      <div id="buttonHolder">
        <button id="btnLeft" className="button" onClick={voteTop} style={{ display: match ? 'none' : 'inline-block' }}>
          Change Bottom
        </button>
        <button id="btnRight" className="button" onClick={voteBottom} style={{ display: match ? 'none' : 'inline-block' }}>
          Change Top
        </button>
      </div>
      <h1 id="time-limit">Time Remaining: {timeRemaining}</h1>
      <div>
      <button id="btnReset" type="button" onClick={reset}>
          Reset
      </button>
      </div>
    </div>
  );
}

export default App;
