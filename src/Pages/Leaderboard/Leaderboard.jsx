import React from "react";
import LeaderboardLayout from "./LeaderboardLayout";

const Leaderboard = ({ onSubscribeClick, onAuthClick, onPolicyClick }) => {
  return (
    <LeaderboardLayout
      onSubscribeClick={onSubscribeClick}
      onAuthClick={onAuthClick}
      onPolicyClick={onPolicyClick}
    />
  );
};

export default Leaderboard;
