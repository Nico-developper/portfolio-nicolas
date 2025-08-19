import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Login from "./components/Login";
import Footer from "./components/Footer";

// Use HashRouter in production (GitHub Pages) to avoid 404 on refresh
const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;

export default function App() {
    return (
        <Router
            basename={import.meta.env.BASE_URL}
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <a href='#main' className='skip-link'>
                Aller au contenu
            </a>
            <Header />
            <main id='main' className='portfolio' role='main'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/projects' element={<Projects />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}
