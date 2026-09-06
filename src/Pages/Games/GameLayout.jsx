import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import GameHero from './GameHero';
import MobileNav from '../../components/MobileNav/MobileNav';

const GameLayout = ({ onGameClick, onBuyAttemptsClick, onAuthClick }) => {
  return (
    <div className="game-layout-wrapper">
      <Navbar onSubscribeClick={onBuyAttemptsClick || onAuthClick} />
      <GameHero 
        onGameClick={onGameClick} 
        onBuyAttemptsClick={onBuyAttemptsClick} 
        onAuthClick={onBuyAttemptsClick || onAuthClick}
      />
      <MobileNav onSubscribeClick={onBuyAttemptsClick || onAuthClick} />
    </div>
  );
};

export default GameLayout;
