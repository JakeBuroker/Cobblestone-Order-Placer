import React from "react";

// Using Google Maps API to embed a map with custom properties
const MyMap = () => {

  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11268.112853903569!2d-93.008888!3d45.085221!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52b2d0e996108a15%3A0x331dc4d0fa18494d!2sCobblestone%20Cafe!5e0!3m2!1sen!2sus!4v1707869085477!5m2!1sen!2sus"
        width="750"
        height="450"
        style={{ border: "1" }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MyMap;
