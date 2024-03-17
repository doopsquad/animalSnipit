import React, { useState } from "react";
import AnimalProfile from "./AnimalProfile";
import "./Style.css";

function App() {

  const [currentIndex, setCurrentIndex] = useState(0);

  const animalData = [
    {
      name: "basking shark",
      img: "https://th.bing.com/th/id/R.db6acb92804f7d7e0a645ca7d3dddbc2?rik=zOVzXpWAq6HNHg&riu=http%3a%2f%2fanimalsadda.com%2fwp-content%2fuploads%2f2013%2f11%2fBasking-Shark-3.jpg&ehk=UJTo17LUZLuEINcA23wi7Qrfn%2bEv%2bDC9NpghytAD33U%3d&risl=&pid=ImgRaw&r=0",
      video: "https://doopsquad.github.io/React-app/whiteRhino.mp4",
      info: "The White Rhino is one of the largest and most recognizable species of rhinoceros...",
    },
    {
      name: "whale shark",
      img: "https://www.thoughtco.com/thmb/o3_yk19FVHEzfbNlIroah5ZqZjs=/4632x3088/filters:no_upscale():max_bytes(150000):strip_icc()/whale-shark-514475851-e56169bf49fb41a49f3b30068f806789.jpg",
      video: "https://doopsquad.github.io/React-app/asianElephant.mp4",
      info: "The Asian Elephant is a majestic species found throughout Southeast Asia's forests and grasslands...",
    },
    {
      name:"rhino",
      img:"https://th.bing.com/th/id/OIP.Kw6EzySU7iAc6sue1y0DKgHaEK?rs=1&pid=ImgDetMain", 
      video:"https://doopsquad.github.io/React-app/whiteRhino.mp4", 
      info: "placeholder",
    },
    {
      name:"asian elephant", 
      img:"https://www.thoughtco.com/thmb/q4t3OQkJIwiyTHnV4Pve34f4Ygo%3D/2250x1500/filters:fill(auto%2C1)/167003501-56a0089e5f9b58eba4ae8f93.jpg", 
      video:"https://doopsquad.github.io/React-app/asianElephant.mp4", 
      info:"placeholder"
    }
    
  ];

  const handleVote = (vote) => {

    const nextIndex = vote === "left" ? currentIndex - 1 : currentIndex + 1;
  
    const newIndex = nextIndex < 0 ? animalData.length - 1 : nextIndex % animalData.length;
  
    setCurrentIndex(newIndex);
  }
  
  return (
    <div className="App">
     <AnimalProfile
      name={animalData[currentIndex].name}
      img={animalData[currentIndex].img}
      video={animalData[currentIndex].video}
      info={animalData[currentIndex].info}
    />
    <h1 id="versus">VERSUS</h1>
    <AnimalProfile
      name={animalData[(currentIndex + 1) % animalData.length].name}
      img={animalData[(currentIndex + 1) % animalData.length].img}
      video={animalData[(currentIndex + 1) % animalData.length].video}
      info={animalData[(currentIndex + 1) % animalData.length].info}
    />
    <button onClick={() => handleVote("left")}>Vote Left</button>
    <button onClick={() => handleVote("right")}>Vote Right</button>
    </div>
  );
}
export default App;
