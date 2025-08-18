import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import "./styles/_global.scss";
import "./styles/styles.scss";
import "../node_modules/@fontsource/inter";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme/theme.js";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </StrictMode>
);
