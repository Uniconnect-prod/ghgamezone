import React, { useState, useEffect } from "react";
import "./SubscribeModal.scss";
import { 
  FaTimes, 
  FaShieldAlt, 
  FaSpinner, 
  FaArrowLeft, 
  FaPhoneAlt, 
  FaBolt
} from "react-icons/fa";
import { SUBSCRIPTION_PACKAGES, subscribeWithPhone } from "../../services/paymentService.js";
import { useAuth } from "../../context/AuthContext.jsx";

const SubscribeModal = ({ isOpen, onClose, gameTitle, onSubscribeSuccess }) => {
  // Step 1: Phone number input, Step 2: Choose subscription package ("subscription thing")
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [packages] = useState(SUBSCRIPTION_PACKAGES);
  const [selectedPkgId, setSelectedPkgId] = useState("pack_weekly");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { user, isLoggedIn, loginSuccess } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setErrorMessage("");
      setIsProcessing(false);

      if (user?.phoneNumber) {
        setPhoneNumber(user.phoneNumber.replace(/^\+?233/, ""));
      }

      // If user is already logged in with a phone number, go directly to packages; otherwise step 1
      if (isLoggedIn && user?.phoneNumber) {
        setStep(2);
      } else {
        setStep(1);
      }
    }
  }, [isOpen, isLoggedIn, user]);

  if (!isOpen) return null;

  const selectedPackage = packages.find((p) => p.id === selectedPkgId) || packages[0];

  // STEP 1: Validate Phone Number & Go to Subscription Packages
  const handleProceedPhone = (e) => {
    if (e) e.preventDefault();
    setErrorMessage("");

    const cleanNum = phoneNumber.trim().replace(/\s+/g, "").replace(/^0/, "").replace(/^\+?233/, "");
    if (!cleanNum || cleanNum.length < 8 || !/^\d+$/.test(cleanNum)) {
      setErrorMessage("Please enter a valid MTN Ghana mobile number");
      return;
    }

    setPhoneNumber(cleanNum);
    setStep(2);
  };

  // STEP 2: Confirm Subscription Package & API Handles Activation
  const handleConfirmSubscription = async () => {
    setErrorMessage("");
    setIsProcessing(true);

    try {
      // API call to handle subscription for this phone number
      const result = await subscribeWithPhone({
        phoneNumber,
        packageId: selectedPackage.id,
      });

      if (result?.user) {
        loginSuccess(result.user, result.tokens || 999, result.subscription);
      }

      if (onSubscribeSuccess) {
        onSubscribeSuccess(selectedPackage.name, result?.subscription);
      }

      onClose();
    } catch (err) {
      console.error("Subscription payment error:", err);
      setErrorMessage(err.message || "Subscription payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="subscribe-modal-overlay" onClick={onClose}>
      <div className="subscribe-modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="close-btn" 
          onClick={onClose} 
          aria-label="Close modal" 
          disabled={isProcessing}
        >
          <FaTimes />
        </button>

        {/* STEP 1: MOBILE NUMBER ENTRY */}
        {step === 1 && (
          <div className="sub-step-phone">
            <h2 className="modal-title">Subscribe to Play</h2>

            {gameTitle ? (
              <p className="game-hint">To unlock unlimited access for <span>{gameTitle}</span></p>
            ) : (
              <p className="game-hint">Get unlimited access to all games on GHGameZone</p>
            )}

            {errorMessage && (
              <div className="error-banner">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleProceedPhone} className="phone-form">
              <label className="input-label" htmlFor="mtn-phone-input">
                MTN Mobile Number
              </label>

              <div className="phone-input-group">
                <span className="country-prefix">+233</span>
                <input
                  id="mtn-phone-input"
                  type="tel"
                  className="phone-input"
                  placeholder="e.g. 54 123 4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  autoFocus
                  required
                  disabled={isProcessing}
                />
              </div>

              <button 
                type="submit" 
                className="proceed-yellow-btn"
                disabled={isProcessing}
              >
                <FaBolt />
                <span>Continue to Plans</span>
              </button>
            </form>

            <div className="security-note">
              <FaShieldAlt className="shield-icon" />
              <span>Official MTN Ghana Mobile Money & Telecom Gateway</span>
            </div>
          </div>
        )}

        {/* STEP 2: CHOOSE SUBSCRIPTION PACKAGE ("SUBSCRIPTION THING") */}
        {step === 2 && (
          <div className="sub-step-package">
            <div className="package-step-header">
              <button 
                className="back-btn" 
                onClick={() => setStep(1)} 
                disabled={isProcessing}
                type="button"
                title="Change mobile number"
              >
                <FaArrowLeft />
              </button>
              <h2 className="modal-title">Choose Subscription Pass</h2>
            </div>

            <div className="selected-phone-pill">
              <span className="phone-tag">
                <FaPhoneAlt /> +233 {phoneNumber || "Mobile"}
              </span>
              <button 
                type="button" 
                className="change-num-btn" 
                onClick={() => setStep(1)}
                disabled={isProcessing}
              >
                Change Number
              </button>
            </div>

            {errorMessage && (
              <div className="error-banner">
                {errorMessage}
              </div>
            )}

            <div className="packages-selection-list">
              {packages.map((pkg) => {
                const isSelected = pkg.id === selectedPkgId;
                return (
                  <div
                    key={pkg.id}
                    className={`package-card ${isSelected ? "selected" : ""}`}
                    onClick={() => setSelectedPkgId(pkg.id)}
                  >
                    <div className="pkg-left">
                      <div className="radio-indicator">
                        {isSelected && <div className="radio-dot"></div>}
                      </div>
                      <div className="pkg-info">
                        <div className="pkg-name">
                          {pkg.name}
                        </div>
                        <div className="pkg-desc">
                          {pkg.desc}
                        </div>
                      </div>
                    </div>

                    <div className="pkg-right">
                      <div className="pkg-price">
                        {pkg.price} {pkg.currency || "GHS"}
                      </div>
                      {pkg.popular && (
                        <span className="popular-badge">POPULAR</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="package-actions">
              <button
                type="button"
                className="proceed-yellow-btn confirm-btn"
                onClick={handleConfirmSubscription}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <FaSpinner className="spin-icon" />
                    <span>Activating Subscription...</span>
                  </>
                ) : (
                  <span>
                    Proceed to Subscribe ({selectedPackage.price} {selectedPackage.currency || "GHS"})
                  </span>
                )}
              </button>

              <button 
                type="button" 
                className="back-text-btn" 
                onClick={onClose}
                disabled={isProcessing}
              >
                Cancel
              </button>
            </div>

            <div className="security-note">
              <FaShieldAlt className="shield-icon" />
              <span>Instant activation • 256-Bit Encrypted • Safe & Secure</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscribeModal;
