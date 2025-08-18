import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Login from "./components/Login";

import "./styles/styles.scss";

export default function App() {
    const basename = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

    return (
        <Router basename={basename}>
            <Header />
            <main className='portfolio'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/projects' element={<Projects />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='*' element={<Navigate to='/' replace />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}
