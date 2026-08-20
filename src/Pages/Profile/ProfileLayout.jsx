import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProfileContent from "./ProfileContent";
import MobileNav from "../../components/MobileNav/MobileNav";

const ProfileLayout = ({ user, onSubscribeClick, onLogout, onAuthClick, onPolicyClick }) => {
  return (
    <div className="profile-layout-wrapper">
      <Navbar onSignInClick={onAuthClick} onBuyTokensClick={onSubscribeClick} />
      <ProfileContent 
        user={user} 
        onSubscribeClick={onSubscribeClick} 
        onLogout={onLogout} 
        onAuthClick={onAuthClick}
        onPolicyClick={onPolicyClick}
      />
      <MobileNav />
    </div>
  );
};

export default ProfileLayout;
