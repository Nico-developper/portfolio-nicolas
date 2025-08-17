import React from "react";
import ProjectCard from "../components/ProjectsCard";
import "../styles/pages/Projects.scss";

import bookiLogo from "../assets/Booki.png";
import sophieLogo from "../assets/Sophie.png";
import ninaLogo from "../assets/Nina.png";
import kasaLogo from "../assets/Kasa.png";
import grimoireLogo from "../assets/MonVieuxGrimoire.png";
import qwentaLogo from "../assets/Qwenta.png";
import portfolioLogo from "../assets/Logo.png";

export default function Projects() {
    const projects = [
        {
            title: "Booki",
            logo: bookiLogo,
            description: "Site de recherche d’hébergements et activités.",
            tech: "HTML / CSS",
            github: "https://github.com/Nico-dev-openclassrooms/Projet-Nico-Open-Classrooms-Booki",
        },
        {
            title: "Sophie Bluel",
            logo: sophieLogo,
            description: "Portfolio d’une architecte d’intérieur dynamique.",
            tech: "JavaScript",
            github: "https://github.com/Nico-dev-openclassrooms/Projet-Nico-Open-Classrooms-Sophie-Bluel",
        },
        {
            title: "Nina Carducci",
            logo: ninaLogo,
            description: "Site de photographe optimisé SEO / performance.",
            tech: "HTML / SEO / Acc.",
            github: "https://github.com/Nico-dev-openclassrooms/Projet-Nico-Open-Classrooms-Nina-Carducci",
        },
        {
            title: "Kasa",
            logo: kasaLogo,
            description: "Application de location entre particuliers.",
            tech: "React / SCSS / Vite",
            github: "https://github.com/Nico-dev-openclassrooms/Projet-Nico-Open-Classrooms-Kasa",
        },
        {
            title: "Mon Vieux Grimoire",
            logo: grimoireLogo,
            description: "Back-end de notation de livres sécurisé.",
            tech: "Node / Express / MongoDB",
            github: "https://github.com/Nico-dev-openclassrooms/Projet-Nico-Open-Classrooms-Mon-Vieux-Grimoire",
        },
        {
            title: "Qwenta – Menu Maker",
            logo: qwentaLogo,
            description: "Outil de création de menus pour restaurateurs.",
            tech: "Planification projet",
            github: "",
        },
        {
            title: "Portfolio React",
            logo: portfolioLogo,
            description: "Portfolio personnel professionnel responsive.",
            tech: "React / SCSS / Responsive",
            github: "https://github.com/Nico-dev-openclassrooms/portfolio-nicolas",
        },
    ];

    return (
        <section className='projects'>
            <div className='container'>
                <h2>Mes Projets</h2>
                <div className='project-grid'>
                    {projects.map((proj, index) => (
                        <ProjectCard key={index} {...proj} />
                    ))}
                </div>
            </div>
        </section>
    );
}
