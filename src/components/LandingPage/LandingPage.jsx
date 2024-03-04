import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import MyMap from '/src/components/MyMap/MyMap';
import { Button } from '@mui/material';

function LandingPage() {
  const history = useHistory();


  return (
    <div className="container">
      {/* Left Section */}
      <div className="left-section">

        <img src={`https://cobblestone-order-placer.s3.amazonaws.com/images/Home.jpg`} alt="Home" className="home-jpg" />
        {/* Brief Biography Section */}
        <div className="bio-container">
        

        </div>
        {/* Reviews Section */}
        <div className="reviews-container">
        <b> <p  style={{marginTop: "3%"}}>"It Doesn't Get Any More Charming Than Cobblestone Cafe, A Downtown Eatery In White Bear Lake, Minnesota"</p></b>
        <p style={{ fontSize: "85%" }}>
  - Betsy Rathburn, at <a href="https://www.onlyinyourstate.com/minnesota/cobblestone-cafe-mn/" style={{ color: "#018972" }}>onlyinyourstate.com</a>
</p>
        </div>
      </div>
      {/* Right Section */}
      <div className="right-section">
      
        {/* Café hours */}
        <div className="hours-container">
          <h4>Open Everyday</h4>
          <p>7:00 AM - 2:00 PM</p>
        </div>
        {/* GPS Section */}
        <div className="map-container">
          <h3>Find Us Here</h3>
          <MyMap width={450} height={350} />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;