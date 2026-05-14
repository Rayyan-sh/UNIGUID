import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-section">
          <h2>UniGuide</h2>
          <p>Develop your skills in a new and unique way.</p>
        </div>

        <div className="footer-section">
          <p>Developed by IT Students – UTAS</p>
          
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: 76s2129@utas.edu.om</p>
          <p>Phone: +968 99223355</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Student Learning Platform.
      </div>
    </footer>
  );
}

export default Footer;