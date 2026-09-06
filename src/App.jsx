import React, { useState, useRef, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Games from "./Pages/Games/Games";
import CategoryGames from "./Pages/CategoryGames/CategoryGames";
import About from "./Pages/About/About";
import HowToPlay from "./Pages/HowToPlay/HowToPlay";
import Contact from "./Pages/Contact/Contact";
import Leaderboard from "./Pages/Leaderboard/Leaderboard";
import SubscribeModal from "./components/SubscribeModal/SubscribeModal";
import PolicyModal from "./components/PolicyModal/PolicyModal";
import GameModal from "./components/GameModal/GameModal";
import { getGameByTitleOrSlug } from "./data/gamesCatalog";
import { useAuth } from "./context/AuthContext.jsx";
import { deductToken } from "./services/tokenService.js";
import "./App.scss";

function App() {
  const { tokens, isLoggedIn, isSubscribed } = useAuth();

  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
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
      await deductToken();

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

  const handleSubscribeClick = () => {
    setSelectedGameTitle("");
    setIsSubscribeOpen(true);
  };

  const handlePolicyClick = (type) => {
    setSelectedPolicyType(type || "Terms & Conditions");
    setIsPolicyOpen(true);
  };

  // Called after payment confirmed and subscription activated in database/API
  const handleSubscribeSuccess = (planName) => {
    showToast(`🎉 Successfully Subscribed to ${planName || "GHGameZone"}! Unlimited Play Active.`);
    
    // If user clicked a game before subscribing, launch it automatically
    if (pendingGameObj) {
      const g = pendingGameObj;
      setPendingGameObj(null);
      setTimeout(() => {
        handleGameClick(g);
      }, 500);
    }
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
              onSubscribeClick={handleSubscribeClick}
              onAuthClick={handleSubscribeClick}
              onPolicyClick={handlePolicyClick}
            />
          }
        />
        <Route
          path="/games"
          element={
            <Games
              onGameClick={handleGameClick}
              onBuyAttemptsClick={handleSubscribeClick}
              onAuthClick={handleSubscribeClick}
            />
          }
        />
        <Route
          path="/category/:categorySlug"
          element={
            <CategoryGames
              onGameClick={handleGameClick}
              onSubscribeClick={handleSubscribeClick}
              onAuthClick={handleSubscribeClick}
              onFooterPolicyClick={handlePolicyClick}
            />
          }
        />
        <Route
          path="/about"
          element={
            <About
              onSubscribeClick={handleSubscribeClick}
              onAuthClick={handleSubscribeClick}
              onPolicyClick={handlePolicyClick}
            />
          }
        />
        <Route
          path="/how-to-play"
          element={
            <HowToPlay
              onSubscribeClick={handleSubscribeClick}
              onAuthClick={handleSubscribeClick}
              onPolicyClick={handlePolicyClick}
            />
          }
        />
        <Route
          path="/contact"
          element={
            <Contact
              onSubscribeClick={handleSubscribeClick}
              onAuthClick={handleSubscribeClick}
              onPolicyClick={handlePolicyClick}
            />
          }
        />
        <Route
          path="/leaderboard"
          element={
            <Leaderboard
              onSubscribeClick={handleSubscribeClick}
              onAuthClick={handleSubscribeClick}
              onPolicyClick={handlePolicyClick}
            />
          }
        />
        {/* Redirect any legacy /profile access to home */}
        <Route path="/profile" element={<Navigate to="/" replace />} />
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

      <PolicyModal
        isOpen={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
        policyType={selectedPolicyType}
      />
    </div>
  );
}

export default App;