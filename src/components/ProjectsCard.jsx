import React from "react";
import "../styles/components/ProjectsCard.scss";

export default function ProjectCard({
    title,
    logo,
    description,
    tech,
    github,
    demo,
}) {
    return (
        <div className='project-card'>
            <img src={logo} alt={title} className='project-logo' />
            <h3>{title}</h3>
            <p>{description}</p>
            <p className='tech'>{tech}</p>
            <div className='links'>
                {github && (
                    <a href={github} target='_blank' rel='noreferrer'>
                        GitHub
                    </a>
                )}
                {demo && (
                    <a href={demo} target='_blank' rel='noreferrer'>
                        Démo
                    </a>
                )}
            </div>
        </div>
    );
}
