import React from "react";
import "../styles/pages/Home.scss";
import { Link } from "react-router-dom";
import nicoLogo from "../assets/nico-logo.png";

export default function Home() {
    return (
        <section className='home'>
            <div className='home__content'>
                <h1>Bienvenue, moi c'est Nicolas</h1>
                <h2>Développeur Web Front-End</h2>
                <p>
                    Développeur web passionné basé à La Réunion, je conçois des
                    sites modernes, performants et accessibles. Mon objectif :
                    transformer vos idées en expériences web engageantes,
                    efficaces et sur-mesure. Besoin d’un site vitrine, d’une
                    interface React ou d’un back-end robuste ? Parlons-en ! .
                </p>
                <div className='home__cta'>
                    <Link to='/projects' className='btn btn-primary'>
                        Voir mes projets
                    </Link>
                    <Link to='/contact' className='btn btn-secondary'>
                        Me contacter
                    </Link>
                </div>
            </div>
            <div className='home__img'>
                <img src={nicoLogo} alt='Logo Nicolas Développeur' />
            </div>
        </section>
    );
}
