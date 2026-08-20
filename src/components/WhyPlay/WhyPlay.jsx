import React from "react";
import "./WhyPlay.scss";
import { FaBolt, FaShieldAlt, FaTrophy } from "react-icons/fa";
import { IoGameControllerOutline } from "react-icons/io5";

const mobileFeatures = [
  {
    icon: <FaBolt />,
    title: "INSTANT PLAY",
    desc: "No downloads, play right away",
  },
  {
    icon: <FaShieldAlt />,
    title: "100% FREE",
    desc: "All games are completely free",
  },
  {
    icon: <FaTrophy />,
    title: "COMPETE",
    desc: "Climb the leaderboard and be the best",
  },
];

const WhyPlay = () => {
  return (
    <section className="why-play-section">

      <div className="ready-to-play-card desktop-only">
        <div className="card-text">
          <h2>READY TO PLAY?</h2>
          <p>The games are calling you!</p>
        </div>
        <div className="card-icon">
          <IoGameControllerOutline />
        </div>
      </div>


      <div className="mobile-features-wrapper mobile-only">
        <div className="section-title">
          <h3>WHY PLAY HERE?</h3>
          <span className="title-dash"></span>
        </div>

        <div className="features-container">
          {mobileFeatures.map((item, index) => (
            <div className="feature-item" key={index}>
              <div className="icon-badge">{item.icon}</div>
              <div className="feature-text">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPlay;