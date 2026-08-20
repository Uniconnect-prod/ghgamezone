import React from "react";
import HowToPlayLayout from "./HowToPlayLayout";

const HowToPlay = ({ onSubscribeClick, onAuthClick, onPolicyClick }) => {
  return (
    <HowToPlayLayout
      onSubscribeClick={onSubscribeClick}
      onAuthClick={onAuthClick}
      onPolicyClick={onPolicyClick}
    />
  );
};

export default HowToPlay;
