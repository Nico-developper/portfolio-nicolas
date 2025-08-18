import React from "react";
import RatingStars from "./RatingStars";
import ProgressBar from "./ProgressBar";
import "../styles/components/Skills.scss";

/**
 * Skills — section to display "Compétences" (stars) & "Langages/Tech" (percent bars)
 * props:
 *  - competences: Array<{ name: string, level: number }>
 *  - languages: Array<{ name: string, value: number }>
 *  - titleCompetences: string (default "Compétences clés")
 *  - titleLanguages: string (default "Langages & technologies")
 */
export default function Skills({
    competences = [],
    languages = [],
    titleCompetences = "Compétences clés",
    titleLanguages = "Langages & technologies",
}) {
    return (
        <section className='skills' id='skills'>
            <div className='skills__group'>
                <h3 className='skills__title'>{titleCompetences}</h3>
                <div className='skills__list skills__list--stars'>
                    {competences.map((c) => (
                        <RatingStars
                            key={c.name}
                            label={c.name}
                            value={c.level}
                        />
                    ))}
                </div>
            </div>

            <div className='skills__group'>
                <h3 className='skills__title'>{titleLanguages}</h3>
                <div className='skills__list skills__list--bars'>
                    {languages.map((l) => (
                        <ProgressBar
                            key={l.name}
                            label={l.name}
                            value={l.value}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
