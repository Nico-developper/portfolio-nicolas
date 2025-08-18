const API = import.meta.env.VITE_API_URL;

export async function login(email, password) {
    const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const text = await res.text();

    if (!res.ok) {
        let message = "Échec de la connexion";
        try {
            const json = JSON.parse(text);
            message = json.error || json.message || message;
        } catch (_) {}
        throw new Error(message);
    }

    const data = JSON.parse(text);
    localStorage.setItem("token", data.token);
}

export function logout() {
    localStorage.removeItem("token");
}

export function getToken() {
    return localStorage.getItem("token");
}

export function isAuthenticated() {
    return !!localStorage.getItem("token");
}
