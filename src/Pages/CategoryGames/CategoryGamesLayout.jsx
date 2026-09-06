import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import CategoryGamesContent from "./CategoryGamesContent";
import MobileNav from "../../components/MobileNav/MobileNav";

const CategoryGamesLayout = ({ onGameClick, onSubscribeClick, onAuthClick, onFooterPolicyClick }) => {
  return (
    <div className="category-games-layout-wrapper">
      <Navbar onSubscribeClick={onSubscribeClick || onAuthClick} />
      <CategoryGamesContent
        onGameClick={onGameClick}
        onSubscribeClick={onSubscribeClick}
        onFooterPolicyClick={onFooterPolicyClick}
      />
      <MobileNav onSubscribeClick={onSubscribeClick || onAuthClick} />
    </div>
  );
};

export default CategoryGamesLayout;
