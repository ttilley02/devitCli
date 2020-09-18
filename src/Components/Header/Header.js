import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import NavBar from "../NavBar/Navbar";
import ProfilePic from "../Utilities/ProfilePic/ProfilePic";
import AppContext from "../../AppContext";

function Header() {
  const context = useContext(AppContext);
  return (
    <section className="header-container">
    <header>
      <Link to={context.user.profile ? "/Business" : "/Freelancer"}>
        <i className="fas fa-angle-double-right"></i>
        Switch to {context.user.profile ? "Business" : "Freelancing"}
      </Link>
      <h1 className="header-heading">
        <Link to="/">DEV.IT</Link>
      </h1>
      <ProfilePic
        imgSrc="https://via.placeholder.com/85"
        imgAlt="profile picture"
      />
      {/* <NavBar /> */}
    </header>
    </section>
  );
}
export default Header;
