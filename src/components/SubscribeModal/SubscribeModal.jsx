import React, { useState, useEffect, useRef } from "react";
import "./SubscribeModal.scss";
import { 
  FaTimes, 
  FaShieldAlt, 
  FaSpinner, 
  FaCheck, 
  FaArrowLeft, 
  FaPhoneAlt, 
  FaUser, 
  FaKey, 
  FaCommentDots, 
  FaRedoAlt, 
  FaCheckCircle,
  FaBolt
} from "react-icons/fa";
import { SUBSCRIPTION_PACKAGES, initiatePayment, verifyPayment } from "../../services/paymentService.js";
import { sendOtp, verifyOtp } from "../../services/authService.js";
import { useAuth } from "../../context/AuthContext.jsx";

const SubscribeModal = ({ isOpen, onClose, gameTitle, onSubscribeSuccess }) => {
  // Step: 1 = Phone number input, 2 = OTP verification (if not logged in), 3 = Name entry, 4 = Package selection
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [simulatedSmsOtp, setSimulatedSmsOtp] = useState(null);
  const [resendTimer, setResendTimer] = useState(30);
  const [name, setName] = useState("");
  const [packages, setPackages] = useState(SUBSCRIPTION_PACKAGES);
  const [selectedPkgId, setSelectedPkgId] = useState("pack_weekly");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { user, isLoggedIn, loginSuccess, updateSubscription, updateTokens } = useAuth();
  const otpInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (isOpen) {
      setErrorMessage("");
      setIsProcessing(false);
      setOtpDigits(["", "", "", ""]);
      setSimulatedSmsOtp(null);

      if (user?.phoneNumber) {
        setPhoneNumber(user.phoneNumber.replace(/^\+?233/, ""));
      }
      if (user?.username) {
        setName(user.username);
      }

      // If user is already logged in, go straight to Package selection!
      if (isLoggedIn) {
        setStep(4);
      } else {
        setStep(1);
      }
    }
  }, [isOpen, isLoggedIn, user]);

  // Resend OTP timer
  useEffect(() => {
    let interval = null;
    if (step === 2 && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  if (!isOpen) return null;

  const selectedPackage = packages.find((p) => p.id === selectedPkgId) || packages[0];

  // STEP 1: Validate Phone & Send OTP
  const handleProceedPhone = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage("");

    const cleanNum = phoneNumber.trim().replace(/\s+/g, "").replace(/^0/, "").replace(/^\+?233/, "");
    if (!cleanNum || cleanNum.length < 8 || !/^\d+$/.test(cleanNum)) {
      setErrorMessage("Please enter a valid MTN Ghana mobile number");
      return;
    }

    setPhoneNumber(cleanNum);

    // If already logged in with this number, jump to packages
    if (isLoggedIn) {
      setStep(4);
      return;
    }

    setIsProcessing(true);
    try {
      const res = await sendOtp(cleanNum);
      setSimulatedSmsOtp(res.otp);
      setOtpDigits(["", "", "", ""]);
      setResendTimer(30);
      setStep(2);

      setTimeout(() => {
        if (otpInputRefs[0]?.current) {
          otpInputRefs[0].current.focus();
        }
      }, 150);
    } catch (err) {
      console.error("Send OTP error:", err);
      setErrorMessage(err.message || "Failed to send OTP code.");
    } finally {
      setIsProcessing(false);
    }
  };

  // STEP 2: OTP DIGITS HANDLING
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    if (value && index < 3) {
      otpInputRefs[index + 1]?.current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs[index - 1]?.current?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (/^\d{4}$/.test(pasted)) {
      setOtpDigits(pasted.split(""));
      otpInputRefs[3]?.current?.focus();
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage("");

    const fullOtp = otpDigits.join("");
    if (fullOtp.length < 4) {
      setErrorMessage("Please enter the 4-digit verification code");
      return;
    }

    setIsProcessing(true);
    try {
      const authRes = await verifyOtp(phoneNumber, fullOtp, name.trim() || undefined);
      if (authRes?.user) {
        setName(authRes.user.username || "");
        loginSuccess(authRes.user, 999, authRes.subscription);

        if (authRes.user.username && !authRes.user.username.startsWith("Gamer_") && !authRes.user.username.startsWith("Player_")) {
          setStep(4);
        } else {
          setStep(3);
        }
      }
    } catch (err) {
      console.error("Verify OTP error:", err);
      setErrorMessage(err.message || "Invalid OTP code. Please try again or use 1234.");
    } finally {
      setIsProcessing(false);
    }
  };

  // STEP 3: Validate Name
  const handleProceedName = (e) => {
    if (e) e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your gamer username");
      return;
    }

    setStep(4);
  };

  // STEP 4: Confirm Subscription Package & Activate Unlimited Play
  const handleConfirmSubscription = async () => {
    setErrorMessage("");
    setIsProcessing(true);

    try {
      // 1. Initiate payment
      const order = await initiatePayment(selectedPackage.id);

      // 2. Verify payment
      const verifyResult = await verifyPayment({
        orderId: order.orderId,
        paymentId: `pay_${Date.now()}`,
        packageId: selectedPackage.id,
      });

      // 3. Update subscription in global context
      if (verifyResult?.subscription) {
        updateSubscription(verifyResult.subscription);
        updateTokens(999);
      }

      if (onSubscribeSuccess) {
        onSubscribeSuccess(selectedPackage.name, verifyResult?.subscription);
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

            {gameTitle && (
              <p className="game-hint">To unlock unlimited access for <span>{gameTitle}</span></p>
            )}

            {errorMessage && (
              <div className="error-banner">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleProceedPhone} className="phone-form">
              <label className="input-label" htmlFor="mtn-phone-input">
                MTN Mobile number
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
                {isProcessing ? (
                  <>
                    <FaSpinner className="spin-icon" />
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <FaKey />
                    <span>Send Verification Code</span>
                  </>
                )}
              </button>
            </form>

            <div className="security-note">
              <FaShieldAlt className="shield-icon" />
              <span>Official MTN Ghana Mobile Money Payment Gateway</span>
            </div>
          </div>
        )}

        {/* STEP 2: OTP VERIFICATION */}
        {step === 2 && (
          <div className="sub-step-phone">
            <div className="step-header-row">
              <button 
                className="back-btn" 
                onClick={() => setStep(1)} 
                disabled={isProcessing}
                type="button"
              >
                <FaArrowLeft />
              </button>
              <h2 className="modal-title">Verify Phone</h2>
            </div>

            <div className="selected-phone-pill">
              <span className="phone-tag"><FaPhoneAlt /> +233 {phoneNumber}</span>
              <button 
                type="button" 
                className="change-num-btn" 
                onClick={() => setStep(1)}
                disabled={isProcessing}
              >
                Change
              </button>
            </div>

            {/* SIMULATED SMS BANNER */}
            {simulatedSmsOtp && (
              <div 
                className="simulated-sms-banner" 
                onClick={() => {
                  setOtpDigits(simulatedSmsOtp.split(""));
                  otpInputRefs[3]?.current?.focus();
                }} 
                title="Tap to autofill"
              >
                <div className="sms-icon-col">
                  <FaCommentDots className="sms-icon" />
                </div>
                <div className="sms-content-col">
                  <span className="sms-sender">📲 MTN SMS NOTIFICATION</span>
                  <span className="sms-text">
                    Your GHGameZone verification OTP is <strong className="otp-highlight">{simulatedSmsOtp}</strong>. (Tap to fill)
                  </span>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="error-banner">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="phone-form">
              <label className="input-label">
                Enter 4-Digit Verification Code
              </label>

              <div className="otp-digit-inputs" onPaste={handleOtpPaste}>
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={otpInputRefs[idx]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className={`otp-box ${digit ? "filled" : ""}`}
                    disabled={isProcessing}
                    autoFocus={idx === 0}
                  />
                ))}
              </div>

              <div className="resend-row">
                {resendTimer > 0 ? (
                  <span className="timer-text">Resend code in {resendTimer}s</span>
                ) : (
                  <button
                    type="button"
                    className="resend-btn"
                    onClick={handleProceedPhone}
                    disabled={isProcessing}
                  >
                    <FaRedoAlt /> Resend Code
                  </button>
                )}
                <button
                  type="button"
                  className="test-code-btn"
                  onClick={() => setOtpDigits(["1", "2", "3", "4"])}
                >
                  Use test code: 1234
                </button>
              </div>

              <button 
                type="submit" 
                className="proceed-yellow-btn"
                disabled={isProcessing || otpDigits.join("").length < 4}
              >
                {isProcessing ? (
                  <>
                    <FaSpinner className="spin-icon" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <FaCheckCircle />
                    <span>Verify & Continue</span>
                  </>
                )}
              </button>
            </form>

            <div className="security-note">
              <FaShieldAlt className="shield-icon" />
              <span>256-Bit Encrypted Mobile Verification</span>
            </div>
          </div>
        )}

        {/* STEP 3: NAME ENTRY */}
        {step === 3 && (
          <div className="sub-step-phone">
            <div className="step-header-row">
              <button 
                className="back-btn" 
                onClick={() => setStep(2)} 
                disabled={isProcessing}
                type="button"
              >
                <FaArrowLeft />
              </button>
              <h2 className="modal-title">Your Gamer Tag</h2>
            </div>

            <div className="selected-phone-pill">
              <span className="phone-tag"><FaPhoneAlt /> +233 {phoneNumber}</span>
              <span className="signed-in-badge"><FaCheckCircle /> Verified</span>
            </div>

            {errorMessage && (
              <div className="error-banner">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleProceedName} className="phone-form">
              <label className="input-label" htmlFor="sub-name-input">
                Enter your gamer username
              </label>

              <div className="name-input-group">
                <FaUser className="user-icon" />
                <input
                  id="sub-name-input"
                  type="text"
                  className="name-input"
                  placeholder="e.g. Kwame or CYBERNINJA"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                Continue to Packages
              </button>
            </form>

            <div className="security-note">
              <FaShieldAlt className="shield-icon" />
              <span>Your gamer identity for rankings and rewards</span>
            </div>
          </div>
        )}

        {/* STEP 4: CHOOSE SUBSCRIPTION PACKAGE */}
        {step === 4 && (
          <div className="sub-step-package">
            <div className="package-step-header">
              {!isLoggedIn && (
                <button 
                  className="back-btn" 
                  onClick={() => setStep(name ? 3 : 2)} 
                  disabled={isProcessing}
                  type="button"
                >
                  <FaArrowLeft />
                </button>
              )}
              <h2 className="modal-title">Choose Package</h2>
            </div>

            <div className="selected-phone-pill">
              <span className="phone-tag">
                <FaUser /> {user?.username || name || "Player"} (+233 {phoneNumber || user?.phoneNumber?.replace("+233", "") || "MTN"})
              </span>
              <span className="signed-in-badge"><FaCheckCircle /> Signed In</span>
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
                Skip to Games
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
