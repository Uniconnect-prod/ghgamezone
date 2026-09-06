import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import LeaderboardContent from "./LeaderboardContent";
import MobileNav from "../../components/MobileNav/MobileNav";

const LeaderboardLayout = ({ onSubscribeClick, onAuthClick, onPolicyClick }) => {
  return (
    <div className="leaderboard-layout-wrapper">
      <Navbar onSubscribeClick={onSubscribeClick || onAuthClick} />
      <LeaderboardContent onSubscribeClick={onSubscribeClick} onPolicyClick={onPolicyClick} />
      <MobileNav onSubscribeClick={onSubscribeClick || onAuthClick} />
    </div>
  );
};

export default LeaderboardLayout;
