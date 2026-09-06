import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HowToPlayContent from "./HowToPlayContent";
import MobileNav from "../../components/MobileNav/MobileNav";

const HowToPlayLayout = ({ onSubscribeClick, onAuthClick, onPolicyClick }) => {
  return (
    <div className="how-to-play-layout-wrapper">
      <Navbar onSubscribeClick={onSubscribeClick || onAuthClick} />
      <HowToPlayContent onSubscribeClick={onSubscribeClick} onPolicyClick={onPolicyClick} />
      <MobileNav onSubscribeClick={onSubscribeClick || onAuthClick} />
    </div>
  );
};

export default HowToPlayLayout;
