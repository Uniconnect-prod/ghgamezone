import React from "react";
import ContactLayout from "./ContactLayout";

const Contact = ({ onSubscribeClick, onAuthClick, onPolicyClick }) => {
  return (
    <ContactLayout
      onSubscribeClick={onSubscribeClick}
      onAuthClick={onAuthClick}
      onPolicyClick={onPolicyClick}
    />
  );
};

export default Contact;
