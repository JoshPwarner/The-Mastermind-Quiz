import React from 'react';
import './styles.css';
 import image from '../../images/img2.jpg';
 import image2 from '../../images/scroll-png.png';
 import { useNavigate } from "react-router-dom";

function AboutusPage() {

    const navigate = useNavigate();

    const handlebackhome = () => {
        navigate("/");
      };
  return (
    <>
    <div role="backHome">
    <div className='aboutUs'>
      {/*<img className="skullImg" src={image} />*/}
      <div className='aboutUs2'>
      {/*<img className="scrollPage" src={image2} />*/}
      <h2 className='h2Tag'>How To Play</h2>
      <ul className='aboutPara'>
        <li className="htp-list">Create a user Name.</li>
        <li className="htp-list">Create or Join A Room.</li>
        <li className="htp-list">Select The Category Of Questions.</li>
        <li className="htp-list">Select The Difficulty Of Questions.</li>
        <li className="htp-list">Select The Number Of Questions.</li>
        <li className="htp-list">Start The Quiz.</li>
        <li className="htp-list">Select An Answer Before Time Runs Out.</li>
        <li className="htp-list">Good Luck!</li>
      </ul>
      <button className="aboutBtn" onClick={handlebackhome}><span>Back Home </span></button>
    </div>
    </div>
   
    </div>
    </>
  )
}

export default AboutusPage;