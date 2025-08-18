import React from "react";
import "../styles/pages/Home.scss";
import { Link } from "react-router-dom";
import nicoLogo from "../assets/nico-logo.png";
import Skills from "../components/Skills";
import SkillsMUI from "../components/SkillsMUI";

const competences = [
    { name: "Intégration HTML/CSS", level: 5 },
    { name: "Accessibilité (a11y)", level: 4 },
    { name: "SEO & Performance", level: 4 },
    { name: "Git & GitHub", level: 5 },
    { name: "Gestion de projet", level: 4 },
    { name: "Tests & Debug", level: 3 },
];

const languages = [
    { name: "HTML5", value: 95 },
    { name: "CSS / SCSS", value: 90 },
    { name: "JavaScript (ES6+)", value: 85 },
    { name: "React", value: 80 },
    { name: "Node.js / Express", value: 70 },
    { name: "MongoDB", value: 65 },
];

export default function Home() {
    return (
        <>
            {/* Première partie (présentation) */}
            <section className='home'>
                <div className='home__content'>
                    <h1>Bienvenue, moi c'est Nicolas</h1>
                    <h2>Développeur Web Front-End</h2>
                    <p>
                        Développeur web passionné basé à La Réunion, je conçois
                        des sites modernes, performants et accessibles. Mon
                        objectif : transformer vos idées en expériences web
                        engageantes, efficaces et sur-mesure. Besoin d’un site
                        vitrine, d’une interface React ou d’un back-end robuste
                        ? Parlons-en !
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

            {/* Deuxième partie (compétences) */}
            <section className='skills-section'>
                <Skills
                    competences={competences}
                    languages={languages}
                    titleCompetences='Compétences clés'
                    titleLanguages='Langages & technologies'
                />
            </section>

            <section className='skills-section'>
                <SkillsMUI
                    competences={competences}
                    languages={languages}
                    titleCompetences='Compétences clés'
                    titleLanguages='Langages & technologies'
                />
            </section>
        </>
    );
}
