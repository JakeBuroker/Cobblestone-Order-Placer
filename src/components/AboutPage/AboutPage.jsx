import React from 'react';
import '/src/components/AboutPage/AboutPage.css'

function AboutPage() {
  return (
    <div className="container">
      <div style={{ fontSize:"130%"}}>
        <h2> Technologies Used</h2>
        <li> Node </li>
        <li> React </li>
        <li >Express </li>
        <li> Redux-Sagas </li>
        <li> Axios </li>
        <li> SQL </li>
        <li> Material UI </li>
        <li> SweetAlert2</li>
        <li> Luxon </li>
        <li> Stripe </li>
        <li> Google Maps Places API </li>
      </div>
      <h3 style={{ paddingLeft: "150px"}}>LinkedIn</h3>
      <img src="/images/flowcode.png" className="qr-code"></img>
      <h3>Github</h3>
      <img src="/images/flowcode.png" className="qr-code"></img>
    </div>
  );
}

export default AboutPage;
