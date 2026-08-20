import React from "react";
import AboutLayout from "./AboutLayout";

const About = ({ onSubscribeClick, onAuthClick, onPolicyClick }) => {
  return (
    <AboutLayout
      onSubscribeClick={onSubscribeClick}
      onAuthClick={onAuthClick}
      onPolicyClick={onPolicyClick}
    />
  );
};

export default About;
