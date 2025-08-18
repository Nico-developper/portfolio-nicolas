const API = import.meta.env.VITE_API_URL;

export async function fetchProjects(params = {}) {
    const url = new URL(`${API}/projects`);
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "")
            url.searchParams.set(k, v);
    });

    const res = await fetch(url);
    if (!res.ok) throw new Error("Erreur API");
    const raw = await res.json();

    return raw.map((p) => ({
        _id: p._id,
        slug: p.slug,
        title: p.title,
        description: p.description,
        coverImage: p.coverImage,
        tech: p.tech,
        githubUrl: p.githubUrl,
        demoUrl: p.demoUrl,
    }));
}

export async function fetchProject(slug) {
    const res = await fetch(`${API}/projects/${slug}`);
    if (!res.ok) throw new Error("Projet introuvable");
    return res.json();
}
