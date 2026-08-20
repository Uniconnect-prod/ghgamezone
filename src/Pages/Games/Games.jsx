import React from "react";
import GameLayout from "./GameLayout";

const Games = ({ onGameClick, onBuyAttemptsClick, onAuthClick }) => {
  return (
    <GameLayout
      onGameClick={onGameClick}
      onBuyAttemptsClick={onBuyAttemptsClick}
      onAuthClick={onAuthClick}
    />
  );
};

export default Games;