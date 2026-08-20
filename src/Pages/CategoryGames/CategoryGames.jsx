import React from "react";
import CategoryGamesLayout from "./CategoryGamesLayout";

const CategoryGames = ({ onGameClick, onSubscribeClick, onAuthClick, onFooterPolicyClick }) => {
  return (
    <CategoryGamesLayout
      onGameClick={onGameClick}
      onSubscribeClick={onSubscribeClick}
      onAuthClick={onAuthClick}
      onFooterPolicyClick={onFooterPolicyClick}
    />
  );
};

export default CategoryGames;
