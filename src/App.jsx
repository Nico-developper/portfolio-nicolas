import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Login from "./components/Login";
import Footer from "./components/Footer";

const isProd = import.meta.env.PROD;

export default function App() {
    const Router = isProd ? HashRouter : BrowserRouter;

    return (
        <Router>
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
