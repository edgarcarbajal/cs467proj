import React, {useState} from "react";
import {Link, NavLink} from "react-router-dom";
import homelogo from "../components/Green Modern Plant Store Logo.svg";
import "./Navbar.css";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav>
            <Link to="/" className="title">
                <img src={homelogo} className="Navbarheader-logo" alt="homelogo"/>
            </Link>
            <div className="menu" onClick={() => {setMenuOpen(!menuOpen);}}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>

                <li>
                    <NavLink to="/Products">Products</NavLink>
                </li>
                <li>
                    <NavLink to="/services">Services</NavLink>
                </li>
                <li>
                    <NavLink to="/contact">Contact</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
            </ul>
            <button className="desktopMenuBtn" onClick={() => {document.getElementById('contact')}}>Admin Login</button>
        </nav>
    );
}
