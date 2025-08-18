import Project from "../models/Project.js";

export async function listProjects(req, res) {
    try {
        const { featured } = req.query;
        const filter = {};
        if (featured === "1" || featured === "true") filter.featured = true;
        const projects = await Project.find(filter).sort({
            order: 1,
            createdAt: -1,
        });
        res.json(projects);
    } catch {
        res.status(500).json({ error: "Erreur serveur" });
    }
}

export async function getProject(req, res) {
    try {
        const { slug } = req.params;
        const project = await Project.findOne({ slug });
        if (!project)
            return res.status(404).json({ error: "Projet introuvable" });
        res.json(project);
    } catch {
        res.status(500).json({ error: "Erreur serveur" });
    }
}

export async function createProject(req, res) {
    try {
        const { title, description, tech, githubUrl, demoUrl } = req.body;
        const project = new Project({
            title,
            description,
            tech: Array.isArray(tech)
                ? tech
                : typeof tech === "string" && tech.length
                ? tech.split(",").map((t) => t.trim())
                : [],
            githubUrl,
            demoUrl,
        });
        await project.save();
        res.status(201).json(project);
    } catch (e) {
        res.status(400).json({
            error: "Création impossible",
            details: e.message,
        });
    }
}

export async function updateProject(req, res) {
    try {
        const { slug } = req.params;
        const updates = {
            ...req.body,
        };
        if (updates.tech) {
            updates.tech = Array.isArray(updates.tech)
                ? updates.tech
                : updates.tech.split(",").map((t) => t.trim());
        }
        if (req.file) {
            updates.coverImage = `data:${
                req.file.mimetype
            };base64,${req.file.buffer.toString("base64")}`;
        }
        const project = await Project.findOneAndUpdate({ slug }, updates, {
            new: true,
            runValidators: true,
        });
        if (!project)
            return res.status(404).json({ error: "Projet introuvable" });
        res.json(project);
    } catch (e) {
        res.status(400).json({
            error: "Mise à jour impossible",
            details: e.message,
        });
    }
}

export async function deleteProject(req, res) {
    try {
        const { slug } = req.params;
        const project = await Project.findOneAndDelete({ slug });
        if (!project)
            return res.status(404).json({ error: "Projet introuvable" });
        res.json({ ok: true });
    } catch {
        res.status(500).json({ error: "Suppression impossible" });
    }
}
