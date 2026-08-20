import React from "react";
import ProfileLayout from "./ProfileLayout";

const Profile = ({ user, onSubscribeClick, onLogout, onAuthClick, onPolicyClick }) => {
  return (
    <ProfileLayout
      user={user}
      onSubscribeClick={onSubscribeClick}
      onLogout={onLogout}
      onAuthClick={onAuthClick}
      onPolicyClick={onPolicyClick}
    />
  );
};

export default Profile;
