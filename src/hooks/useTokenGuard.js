import { useState, useRef, useCallback } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { deductToken } from "../services/tokenService.js";


export const useTokenGuard = ({ onAuthRequired, onBuyTokensRequired, onLaunchGame, onToast }) => {
  const { isLoggedIn, tokens, updateTokens } = useAuth();
  const [isDeducting, setIsDeducting] = useState(false);
  const isDeductingRef = useRef(false);

  const requestPlayGame = useCallback(
    async (game) => {
      // Prevent double click / race condition
      if (isDeductingRef.current) return;

      if (!isLoggedIn) {
        if (onToast) onToast("🔒 Please sign in or create an account to play!");
        if (onAuthRequired) onAuthRequired(game);
        return;
      }

      if (tokens < 1) {
        if (onToast) onToast("⚡ You have 0 tokens! Buy tokens to start playing.");
        if (onBuyTokensRequired) onBuyTokensRequired(game);
        return;
      }

      try {
        isDeductingRef.current = true;
        setIsDeducting(true);

        // Deduct exactly 1 token from backend/database
        const result = await deductToken();

        // Update token balance immediately from backend response
        if (result && typeof result.tokens === "number") {
          updateTokens(result.tokens);
        } else {
          updateTokens(Math.max(0, tokens - 1));
        }

        if (onToast) {
          onToast(`🎮 1 Token used. ${result?.tokens ?? tokens - 1} tokens remaining.`);
        }

        // Launch game in iframe
        if (onLaunchGame) {
          onLaunchGame(game);
        }
      } catch (err) {
        console.error("Failed to deduct token:", err);
        if (onToast) {
          onToast(err.message || "Failed to start game. Please try again.");
        }
        if (err.message && err.message.toLowerCase().includes("insufficient")) {
          if (onBuyTokensRequired) onBuyTokensRequired(game);
        }
      } finally {
        isDeductingRef.current = false;
        setIsDeducting(false);
      }
    },
    [isLoggedIn, tokens, updateTokens, onAuthRequired, onBuyTokensRequired, onLaunchGame, onToast]
  );

  return {
    requestPlayGame,
    isDeducting,
    tokens,
    isLoggedIn,
  };
};

export default useTokenGuard;
