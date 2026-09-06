import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import AboutContent from "./AboutContent";
import MobileNav from "../../components/MobileNav/MobileNav";

const AboutLayout = ({ onSubscribeClick, onAuthClick, onPolicyClick }) => {
  return (
    <div className="about-layout-wrapper">
      <Navbar onSubscribeClick={onSubscribeClick || onAuthClick} />
      <AboutContent onSubscribeClick={onSubscribeClick} onPolicyClick={onPolicyClick} />
      <MobileNav onSubscribeClick={onSubscribeClick || onAuthClick} />
    </div>
  );
};

export default AboutLayout;
