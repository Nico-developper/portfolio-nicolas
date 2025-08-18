import * as React from "react";
import Grid from "@mui/material/Grid";
import { Box, Paper, Typography, Rating, LinearProgress } from "@mui/material";

export default function SkillsMUI({
    competences = [],
    languages = [],
    titleCompetences = "Compétences clés",
    titleLanguages = "Langages & technologies",
}) {
    return (
        <Box component='section' sx={{ my: { xs: 4, md: 6 } }}>
            <Grid container spacing={3}>
                {/* Colonne gauche : Compétences (étoiles) */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={1} sx={{ p: 3 }}>
                        <Typography variant='h6' component='h3' gutterBottom>
                            {titleCompetences}
                        </Typography>

                        <Box sx={{ display: "grid", rowGap: 1.25 }}>
                            {competences.map((c) => (
                                <Box
                                    key={c.name}
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr auto",
                                        alignItems: "center",
                                        py: 0.5,
                                        borderBottom: "1px solid",
                                        borderColor: "divider",
                                    }}
                                >
                                    <Typography
                                        variant='body1'
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {c.name}
                                    </Typography>
                                    <Rating
                                        name={`rating-${c.name}`}
                                        value={Number(c.level) || 0}
                                        max={5}
                                        readOnly
                                        aria-label={`${c.name}: ${c.level}/5`}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>

                {/* Colonne droite : Langages (barres %) */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={1} sx={{ p: 3 }}>
                        <Typography variant='h6' component='h3' gutterBottom>
                            {titleLanguages}
                        </Typography>

                        <Box sx={{ display: "grid", rowGap: 1.25 }}>
                            {languages.map((l) => {
                                const pct = Math.max(
                                    0,
                                    Math.min(100, Number(l.value) || 0)
                                );
                                return (
                                    <Box
                                        key={l.name}
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "1fr minmax(160px,1fr) auto",
                                            alignItems: "center",
                                            columnGap: 2,
                                            py: 0.5,
                                        }}
                                    >
                                        <Typography
                                            variant='body1'
                                            sx={{ fontWeight: 600 }}
                                        >
                                            {l.name}
                                        </Typography>

                                        <LinearProgress
                                            variant='determinate'
                                            value={pct}
                                            sx={{
                                                height: 10,
                                                borderRadius: 999,
                                            }}
                                            aria-label={`${l.name}: ${pct}%`}
                                        />

                                        <Typography
                                            variant='body2'
                                            sx={{
                                                width: "3.5ch",
                                                textAlign: "right",
                                                opacity: 0.75,
                                            }}
                                        >
                                            {pct}%
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
