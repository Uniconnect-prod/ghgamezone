import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaUserAlt,
  FaBolt,
} from "react-icons/fa";
import "./Navbar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Navbar = ({ onSignInClick, onBuyTokensClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, tokens, isLoggedIn, isSubscribed } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <svg className="frame" viewBox="0 0 1400 72" preserveAspectRatio="none">
          <defs>
            <linearGradient id="borderGradient">
              <stop offset="0%" stopColor="#ff4df8" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>

          <path
            d="
                M20 0
                L0 18
                L0 54
                L20 72
                L1380 72
            "
            fill="none"
            stroke="url(#borderGradient)"
            strokeWidth="2"
          />
        </svg>

        <div className="mobileMenu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className="logo">
          <NavLink to="/">
            <img src="/logo2.png" alt="GhGameZone" />
          </NavLink>
        </div>

        <ul className={menuOpen ? "navLinks active" : "navLinks"}>
          <li className="mobile-nav-logo">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              <img src="/logo1.png" alt="GhGameZone" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              HOME
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/games"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              GAMES
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              ABOUT US
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/how-to-play"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              HOW TO PLAY
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              CONTACT
            </NavLink>
          </li>
        </ul>

        <div className="rightSide">
          <div className="searchBox">
            <input type="text" placeholder="Search games..." />
            <FaSearch />
          </div>

          {isLoggedIn ? (
            <div className="auth-user-section">
              <div
                className={`token-pill-nav ${isSubscribed ? "subscribed" : ""}`}
                title={isSubscribed ? "Active Unlimited Pass (Click to view Profile)" : "Get Subscription Pass"}
                onClick={isSubscribed ? () => navigate("/profile") : onBuyTokensClick}
              >
                <FaBolt className="bolt" />
                <span className="token-count">{isSubscribed ? "UNLIMITED" : "GET PASS"}</span>
                <span className="token-label">{isSubscribed ? "PASS" : "1 GHS"}</span>
              </div>

              <div className="user-profile-menu">
                <button
                  className="user-profile-btn"
                  onClick={() => navigate("/profile")}
                  title="View Profile"
                >
                  <FaUserAlt />
                  <span className="username">{user?.username || "GAMER"}</span>
                </button>
              </div>
            </div>
          ) : (
            <button className="loginBtn" onClick={onSignInClick}>
              <FaUserAlt />
              <span>SIGN IN</span>
            </button>
          )}

          <div className="mobileHeaderIcons">
            {isLoggedIn && (
              <div className="mobile-token-badge" onClick={isSubscribed ? () => navigate("/profile") : (onBuyTokensClick || (() => navigate("/profile")))}>
                <FaBolt />
                <span>{isSubscribed ? "VIP" : "PASS"}</span>
              </div>
            )}
            {isLoggedIn ? (
              <div className="icon-btn profile-icon" onClick={() => navigate("/profile")} title="Profile">
                <FaUserAlt />
              </div>
            ) : (
              <div className="icon-btn" onClick={onSignInClick} title="Sign In">
                <FaUserAlt />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;