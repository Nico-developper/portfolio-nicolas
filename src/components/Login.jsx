import { useState } from "react";
import { login } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import "../styles/components/Login.scss";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/admin");
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <section className='login-page'>
            <form className='login-form' onSubmit={handleLogin}>
                <h2>Connexion</h2>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='Mot de passe'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type='submit'>Se connecter</button>
                {message && <p className='error'>{message}</p>}
            </form>
        </section>
    );
}
