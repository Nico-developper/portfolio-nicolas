import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/components/Header.scss";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className='header'>
            <div className='container'>
                <h1 className='logo'>Nicolas Développeur</h1>

                <nav className={`nav ${menuOpen ? "open" : ""}`}>
                    <ul>
                        <li>
                            <Link to='/' onClick={closeMenu}>
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link to='/about' onClick={closeMenu}>
                                À propos
                            </Link>
                        </li>
                        <li>
                            <Link to='/projects' onClick={closeMenu}>
                                Projets
                            </Link>
                        </li>
                        <li>
                            <Link to='/contact' onClick={closeMenu}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>

                <button
                    className={`burger ${menuOpen ? "active" : ""}`}
                    onClick={toggleMenu}
                    aria-label='Menu'
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
}
