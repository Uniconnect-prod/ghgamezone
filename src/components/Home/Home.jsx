import React from "react";
import MainLayout from "../Layout/MainLayout";

const Home = ({ onGameClick, onSubscribeClick, onAuthClick, onPolicyClick }) => {
  return (
    <MainLayout
      onGameClick={onGameClick}
      onSubscribeClick={onSubscribeClick}
      onAuthClick={onAuthClick}
      onPolicyClick={onPolicyClick}
    />
  );
};

export default Home;