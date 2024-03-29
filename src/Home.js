import React from 'react'
import "./Style.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className='home-page'>
      <h1 id="home-title">Animal Snipit🫎</h1>
      <Link to="/app">
        <button id="home-btn">Start</button>
      </Link>
    </div>
  )
}

export default Home;
