import React from 'react'
import "./Style.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className='home-page'>
      <h1 id="home-title">Safar🫎</h1>
      <div className='home-buttons'>
      <Link to="/app">
        <button id="home-easy" className='home-button'>Start</button>
      </Link>
      <Link to="/collection">
        <button id="home-beastiary" className='home-button'>Bestiary</button>
      </Link>
      <Link to="/feed">
        <button id="home-feed" className='home-button'>Feed</button>
      </Link>
      </div>
    </div>
  )
}

export default Home;
