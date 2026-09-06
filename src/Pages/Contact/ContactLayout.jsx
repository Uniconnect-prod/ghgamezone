import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ContactContent from "./ContactContent";
import MobileNav from "../../components/MobileNav/MobileNav";

const ContactLayout = ({ onSubscribeClick, onAuthClick, onPolicyClick }) => {
  return (
    <div className="contact-layout-wrapper">
      <Navbar onSubscribeClick={onSubscribeClick || onAuthClick} />
      <ContactContent onSubscribeClick={onSubscribeClick} onPolicyClick={onPolicyClick} />
      <MobileNav onSubscribeClick={onSubscribeClick || onAuthClick} />
    </div>
  );
};

export default ContactLayout;
