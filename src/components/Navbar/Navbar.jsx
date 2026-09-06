import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaUserAlt,
  FaBolt,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Navbar = ({ onSubscribeClick, onSignInClick, onBuyTokensClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isSubscribed, logoutUser } = useAuth();

  const handleSubscribe = onSubscribeClick || onBuyTokensClick || onSignInClick;

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

          {isSubscribed ? (
            <div className="auth-user-section">
              <div
                className="token-pill-nav subscribed"
                title="Active Unlimited Pass (Click to Extend)"
                onClick={handleSubscribe}
              >
                <FaBolt className="bolt" />
                <span className="token-count">VIP PASS</span>
                <span className="token-label">ACTIVE</span>
              </div>

              <div className="user-profile-menu">
                <div
                  className="user-phone-tag"
                  title={user?.phoneNumber || user?.username || "Active Subscriber"}
                >
                  <FaUserAlt />
                  <span className="username">
                    {user?.phoneNumber
                      ? `+233 ${user.phoneNumber.replace(/^\+?233/, "")}`
                      : user?.username || "VIP"}
                  </span>
                </div>
                <button
                  className="logout-nav-btn"
                  onClick={logoutUser}
                  title="Sign Out"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            </div>
          ) : (
            <button className="loginBtn subscribe-cta-btn" onClick={handleSubscribe}>
              <FaBolt />
              <span>SUBSCRIBE</span>
            </button>
          )}

          <div className="mobileHeaderIcons">
            {isSubscribed ? (
              <>
                <div
                  className="mobile-token-badge"
                  onClick={handleSubscribe}
                  title="VIP Pass Active (Click to extend)"
                >
                  <FaBolt />
                  <span>VIP</span>
                </div>
                <div
                  className="icon-btn logout-icon"
                  onClick={logoutUser}
                  title="Sign Out"
                >
                  <FaSignOutAlt />
                </div>
              </>
            ) : (
              <button className="mobile-subscribe-btn" onClick={handleSubscribe}>
                <FaBolt />
                <span>SUBSCRIBE</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;