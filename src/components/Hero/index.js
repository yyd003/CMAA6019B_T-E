import React from 'react';
import './Hero.css';

function Hero({ heroSection }) {
  return (
    <section className="hero" ref={heroSection.ref}>
      <audio 
        src="/audio/j.fla-Payphone.mp3" 
        autoPlay 
        loop 
        controls 
      />
      {/* Display click position for demonstration */}
      <p className="click-info">
        Last click in Hero: X: {Math.round(heroSection.clickPosition.x)}, 
        Y: {Math.round(heroSection.clickPosition.y)}
      </p>
    </section>
  );
}

export default Hero;