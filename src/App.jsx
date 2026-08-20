import React, { useState, useRef, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Games from "./Pages/Games/Games";
import CategoryGames from "./Pages/CategoryGames/CategoryGames";
import About from "./Pages/About/About";
import HowToPlay from "./Pages/HowToPlay/HowToPlay";
import Contact from "./Pages/Contact/Contact";
import Leaderboard from "./Pages/Leaderboard/Leaderboard";
import Profile from "./Pages/Profile/Profile";
import SubscribeModal from "./components/SubscribeModal/SubscribeModal";
import AuthModal from "./components/AuthModal/AuthModal";
import PolicyModal from "./components/PolicyModal/PolicyModal";
import GameModal from "./components/GameModal/GameModal";
import { getGameByTitleOrSlug } from "./data/gamesCatalog";
import { useAuth } from "./context/AuthContext.jsx";
import { deductToken } from "./services/tokenService.js";
import "./App.scss";

function App() {
  const { user, tokens, isLoggedIn, isSubscribed, subscription, logoutUser, updateTokens, updateSubscription } = useAuth();

  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);
  
  const [selectedPolicyType, setSelectedPolicyType] = useState("Terms & Conditions");
  const [selectedGameTitle, setSelectedGameTitle] = useState("");
  const [activeGameObj, setActiveGameObj] = useState(null);
  const [pendingGameObj, setPendingGameObj] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const isDeductingRef = useRef(false);

  const showToast = useCallback((msg, duration = 4000) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), duration);
  }, []);

  /**
   * Time-based Unlimited Game Play Initiation:
   * 1. If not logged in or no active subscription -> Prompt Subscription Modal (Daily / Weekly / Monthly)
   * 2. If active subscription -> Launch embedded game iframe with unlimited play!
   */
  const handleGameClick = useCallback(async (titleOrGame) => {
    const targetGame = typeof titleOrGame === "string" 
      ? getGameByTitleOrSlug(titleOrGame) 
      : titleOrGame || getGameByTitleOrSlug("");

    setSelectedGameTitle(targetGame.title);

    // 1. Not logged in or not subscribed -> Open Subscribe Modal directly
    if (!isLoggedIn || !isSubscribed) {
      setPendingGameObj(targetGame);
      setIsSubscribeOpen(true);
      return;
    }

    // 2. Prevent race conditions
    if (isDeductingRef.current) return;

    try {
      isDeductingRef.current = true;
      const result = await deductToken();

      setActiveGameObj(targetGame);
      setIsGameOpen(true);
      showToast(`🎮 Launching ${targetGame.title} (Unlimited Play Active)`);
    } catch (err) {
      console.error("Game launch error:", err);
      showToast(err.message || "Please subscribe to get unlimited daily/weekly access.");
      setPendingGameObj(targetGame);
      setIsSubscribeOpen(true);
    } finally {
      isDeductingRef.current = false;
    }
  }, [isLoggedIn, isSubscribed, showToast]);

  const handleBuyAttemptsClick = () => {
    setSelectedGameTitle("");
    setIsSubscribeOpen(true);
  };

  const handleAuthClick = () => {
    setIsAuthOpen(true);
  };

  const handlePolicyClick = (type) => {
    setSelectedPolicyType(type || "Terms & Conditions");
    setIsPolicyOpen(true);
  };

  // Called after payment confirmed and subscription activated in database
  const handleSubscribeSuccess = (planName, newSub) => {
    showToast(`🎉 Successfully Subscribed to ${planName || "GHGameZone"}! Unlimited Play Active.`);
    
    // If user clicked a game before buying subscription, launch it automatically
    if (pendingGameObj) {
      const g = pendingGameObj;
      setPendingGameObj(null);
      setTimeout(() => {
        handleGameClick(g);
      }, 500);
    }
  };

  // Called after user logs in or signs up
  const handleLoginSuccess = (username) => {
    showToast(`👋 Welcome to GHGameZone, ${username}!`);
    if (pendingGameObj) {
      const g = pendingGameObj;
      setPendingGameObj(null);
      setTimeout(() => {
        handleGameClick(g);
      }, 500);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    showToast("Signed out successfully.");
  };

  return (
    <div className="app-container">
      {toastMessage && (
        <div className="global-toast-notification">
          <span>{toastMessage}</span>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              onGameClick={handleGameClick}
              onSubscribeClick={handleBuyAttemptsClick}
              onAuthClick={handleAuthClick}
              onPolicyClick={handlePolicyClick}
            />
          }
        />
        <Route
          path="/games"
          element={
            <Games
              onGameClick={handleGameClick}
              onBuyAttemptsClick={handleBuyAttemptsClick}
              onAuthClick={handleAuthClick}
            />
          }
        />
        <Route
          path="/category/:categorySlug"
          element={
            <CategoryGames
              onGameClick={handleGameClick}
              onSubscribeClick={handleBuyAttemptsClick}
              onAuthClick={handleAuthClick}
              onFooterPolicyClick={handlePolicyClick}
            />
          }
        />
        <Route
          path="/about"
          element={
            <About
              onSubscribeClick={handleBuyAttemptsClick}
              onAuthClick={handleAuthClick}
              onPolicyClick={handlePolicyClick}
            />
          }
        />
        <Route
          path="/how-to-play"
          element={
            <HowToPlay
              onSubscribeClick={handleBuyAttemptsClick}
              onAuthClick={handleAuthClick}
              onPolicyClick={handlePolicyClick}
            />
          }
        />
        <Route
          path="/contact"
          element={
            <Contact
              onSubscribeClick={handleBuyAttemptsClick}
              onAuthClick={handleAuthClick}
              onPolicyClick={handlePolicyClick}
            />
          }
        />
        <Route
          path="/leaderboard"
          element={
            <Leaderboard
              onSubscribeClick={handleBuyAttemptsClick}
              onAuthClick={handleAuthClick}
              onPolicyClick={handlePolicyClick}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              user={user?.username || (typeof user === "string" ? user : null)}
              onSubscribeClick={handleBuyAttemptsClick}
              onLogout={handleLogout}
              onAuthClick={handleAuthClick}
              onPolicyClick={handlePolicyClick}
            />
          }
        />
      </Routes>

      {/* POPUP MODALS */}
      <GameModal
        isOpen={isGameOpen}
        onClose={() => setIsGameOpen(false)}
        game={activeGameObj}
        turnsRemaining={tokens}
        onBuyTokensClick={() => {
          setIsGameOpen(false);
          setIsSubscribeOpen(true);
        }}
        onPlayAgain={(game) => {
          setIsGameOpen(false);
          setTimeout(() => {
            handleGameClick(game);
          }, 200);
        }}
      />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => {
          setIsSubscribeOpen(false);
          setPendingGameObj(null);
        }}
        gameTitle={selectedGameTitle}
        onSubscribeSuccess={handleSubscribeSuccess}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setPendingGameObj(null);
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      <PolicyModal
        isOpen={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
        policyType={selectedPolicyType}
      />
    </div>
  );
}

export default App;