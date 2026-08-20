import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LeaderboardContent.scss";
import {
  FaTrophy,
  FaMedal,
  FaBolt,
  FaCrown,
  FaFire,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGamepad,
  FaGift,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";

const LeaderboardContent = ({ onSubscribeClick, onPolicyClick }) => {
  const [timeframe, setTimeframe] = useState("WEEKLY");
  // Empty player list ready for dynamic backend API integration
  const [players] = useState([]);

  return (
    <div className="leaderboard-page-container">
      {/* 1. HERO SECTION */}
      <section className="lb-hero">
        <div className="hero-bg-overlay">
          <img src="/games-bg.png" alt="Leaderboard background" />
        </div>

        <div className="hero-content">
          <div className="text-col">
            <span className="hero-tag">
              <FaTrophy /> GLOBAL TOURNAMENT
            </span>
            <h1 className="hero-title">
              LEADERBOARD <br />
              <span className="purple">CHAMPIONS</span>
            </h1>
            <p className="hero-subtitle">
              Compete across all 25 arcade games, score high, and claim real cash & data prizes on the official MTN leaderboard!
            </p>
          </div>

          <div className="graphic-col">
            <div className="crown-podium">
              <FaCrown className="crown-icon" />
              <div className="neon-glow-ring"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TOURNAMENT STATS BAR */}
      <section className="lb-stats-banner">
        <div className="stat-card">
          <div className="stat-icon prize">
            <FaGift />
          </div>
          <div className="stat-info">
            <span className="stat-val">5,000 GHS</span>
            <span className="stat-lbl">Weekly Prize Pool</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon time">
            <FaClock />
          </div>
          <div className="stat-info">
            <span className="stat-val">Weekly Reset</span>
            <span className="stat-lbl">Live Season Active</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon games">
            <FaGamepad />
          </div>
          <div className="stat-info">
            <span className="stat-val">25 Games</span>
            <span className="stat-lbl">Tournament Eligible</span>
          </div>
        </div>
      </section>

      {/* 3. TIMEFRAME FILTER BAR */}
      <section className="lb-filter-section">
        <div className="filter-pills">
          {["DAILY", "WEEKLY", "MONTHLY", "ALL TIME"].map((tf) => (
            <button
              key={tf}
              className={`pill ${timeframe === tf ? "active" : ""}`}
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      </section>

      {/* 4. MAIN RANKING CONTENT (DYNAMIC OR EMPTY STATE) */}
      <section className="lb-main-rankings">
        {players.length === 0 ? (
          <div className="empty-rankings-box">
            <div className="empty-trophy-glow">
              <FaTrophy className="trophy-icon" />
            </div>
            <h3 className="empty-title">NO RANKINGS TO SHOW</h3>
            <p className="empty-desc">
              Scores for the <strong>{timeframe}</strong> tournament cycle are being fetched from the server.
              <br />
              Play any game right now to set the high score and claim the <strong>#1 Champion Rank</strong>!
            </p>
            <div className="empty-actions">
              <Link to="/games" className="play-now-btn">
                <FaGamepad /> PLAY GAMES NOW
              </Link>
              <button className="get-turns-btn" onClick={onSubscribeClick}>
                <FaBolt /> GET TURNS / SUBSCRIBE
              </button>
            </div>
          </div>
        ) : (
          <div className="rankings-table-wrap">
            {/* When players array is populated from backend API */}
            <div className="rankings-list">
              {players.map((p, idx) => (
                <div className="rank-row-card" key={p.id || idx}>
                  <span className="rank-num">#{idx + 1}</span>
                  <div className="player-profile">
                    <img src={p.avatar || "/avatars/avatar.png"} alt={p.name} className="row-avatar" />
                    <div className="name-info">
                      <span className="name">{p.name}</span>
                      <span className="win-rate">Score: {p.score} PTS</span>
                    </div>
                  </div>
                  <div className="score-badge">
                    <span>{p.score} PTS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 5. HOW LEADERBOARD WORKS / TOURNAMENT PERKS */}
      <section className="lb-perks-section">
        <div className="section-title-wrap">
          <h3>HOW TO WIN REWARDS</h3>
          <span className="title-dash"></span>
        </div>

        <div className="perks-grid">
          <div className="perk-card">
            <div className="perk-badge">1</div>
            <h4>Subscribe & Play</h4>
            <p>Use your turns to play any of the 25 HTML5 games on GhGameZone.</p>
          </div>

          <div className="perk-card">
            <div className="perk-badge">2</div>
            <h4>Rack Up High Scores</h4>
            <p>Every match adds to your global point total and tournament standings.</p>
          </div>

          <div className="perk-card">
            <div className="perk-badge">3</div>
            <h4>Win MTN Rewards</h4>
            <p>Top weekly & monthly finishers win instant airtime, data packages, and cash rewards!</p>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="lb-cta-section">
        <div className="cta-box">
          <div className="cta-text">
            <h2>WANT TO CLIMB THE LEADERBOARD?</h2>
            <p>Get game turns now and start setting high scores across all games!</p>
            <button className="subscribe-btn" onClick={onSubscribeClick}>
              <FaBolt /> SUBSCRIBE & GET TURNS
            </button>
          </div>
          <div className="cta-graphic">
            <div className="trophy-circle">
              <FaTrophy className="trophy-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="lb-footer-container">
        <div className="footer-top-row">
          <div className="brand-col">
            <img src="/logo2.png" alt="GhGameZone" className="footer-logo-img" />
            <p className="brand-tagline">
              Mini games. Maximum fun.
              <br />
              Play 25 games instantly.
            </p>
          </div>

          <div className="links-col">
            <h4>QUICK LINKS</h4>
            <Link to="/">Home</Link>
            <Link to="/games">Games</Link>
            <Link to="/about">About Us</Link>
            <Link to="/how-to-play">How to Play</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="support-col">
            <h4>SUPPORT & LEGAL</h4>
            <button className="footer-link-btn" onClick={() => onPolicyClick && onPolicyClick("Help Center")}>Help Center</button>
            <button className="footer-link-btn" onClick={() => onPolicyClick && onPolicyClick("Terms & Conditions")}>Terms & Conditions</button>
            <button className="footer-link-btn" onClick={() => onPolicyClick && onPolicyClick("Privacy Policy")}>Privacy Policy</button>
            <button className="footer-link-btn" onClick={() => onPolicyClick && onPolicyClick("Refund Policy")}>Subscription Policy</button>
          </div>

          <div className="social-payments-col">
            <div className="social-group">
              <h4>FOLLOW US</h4>
              <div className="icons-row">
                <a href="https://web.facebook.com/MTNGhana/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
                <a href="https://www.instagram.com/mtnghana/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                <a href="https://x.com/MTNGhana/" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom-copy">
          <p>© 2026 GHGAMEZONE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LeaderboardContent;
