import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTrophy,
  FaAngleDoubleRight,
} from "react-icons/fa";
import "./LeaderBoard.scss";

// Empty top players list - ready to be populated from backend API
const players = [];

const LeaderBoard = () => {
  const navigate = useNavigate();

  return (
    <section className="leaderboard">
      <div className="leaderboard-header">
        <div className="title">
          <FaTrophy className="trophy-icon" />
          <h3>TOP PLAYERS</h3>
        </div>

        <button 
          className="icon-btn" 
          aria-label="View more players"
          onClick={() => navigate("/leaderboard")}
        >
          <FaAngleDoubleRight />
        </button>
      </div>

      <div className="players-list">
        {players && players.length > 0 ? (
          players.map((player) => (
            <div className="player-row" key={player.rank}>
              <div className="player-info">
                <div className={`rank-badge rank-${player.rank}`}>
                  {player.rank}
                </div>

                <img
                  src={player.avatar || "/avatars/avatar.png"}
                  alt={player.name}
                  onError={(e) => {
                    e.target.src = "/logo1.png";
                  }}
                />

                <h4 className="player-name">{player.name}</h4>
              </div>

              <span className="player-score">{player.score}</span>
            </div>
          ))
        ) : (
          <div className="empty-players-box">
            <p>No ranking to show</p>
          </div>
        )}
      </div>

      <button className="leaderboard-btn" onClick={() => navigate("/leaderboard")}>
        VIEW FULL LEADERBOARD
      </button>
    </section>
  );
};

export default LeaderBoard;