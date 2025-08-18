import React from "react";
import "../styles/components/RatingStars.scss";

/**
 * RatingStars — read‑only star rating for accessibility + pixel‑perfect display
 * props:
 *  - label: string (name of the skill)
 *  - value: number (1..5)
 *  - outOf: number (default 5)
 *  - size: number (px height of star, default 20)
 */
export default function RatingStars({
    label,
    value = 0,
    outOf = 5,
    size = 20,
}) {
    const stars = Array.from({ length: outOf }, (_, i) => i + 1);
    const clamped = Math.max(0, Math.min(value, outOf));

    return (
        <div
            className='rating-stars'
            aria-label={`${label}: ${clamped}/${outOf}`}
        >
            <span className='rating-label'>{label}</span>
            <div className='stars' role='img' aria-hidden='true'>
                {stars.map((n) => (
                    <svg
                        key={n}
                        className={`star ${n <= clamped ? "filled" : ""}`}
                        width={size}
                        height={size}
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path d='M12 2l3.09 6.26L22 9.27l-5 4.88L18.18 22 12 18.56 5.82 22 7 14.15l-5-4.88 6.91-1.01L12 2z' />
                    </svg>
                ))}
            </div>
        </div>
    );
}
