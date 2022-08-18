import React from 'react';
import './styles.css';
import image from '../../images/img2.jpg';
import image2 from '../../images/scroll-png.png';

function AboutusPage() {
  return (
    <div>
      <img className="bgImg" src={image} />
      <img className="scrollPage" src={image2} />
      <h2>How To Play</h2>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
    </div>
  )
}

export default AboutusPage;