import React, { useState } from "react";
import { motion } from "framer-motion";
import { getToken } from "@/services/authService";
import "../styles/components/AddProjectModal.scss";

export default function AddProjectModal({ onClose, onAdd }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        tech: "",
        githubUrl: "",
        demoUrl: "",
        imageFile: null,
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
            setMessage("Seuls les fichiers JPG/JPEG/PNG sont autorisés.");
            return;
        }

        if (file.size > 20 * 1024 * 1024) {
            setMessage("Le fichier dépasse 20 Mo.");
            return;
        }

        setForm({ ...form, imageFile: file });
        setPreviewImage(URL.createObjectURL(file));
        setMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = getToken();

        try {
            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("description", form.description);
            formData.append(
                "tech",
                Array.isArray(form.tech) ? form.tech.join(",") : form.tech
            );
            formData.append("githubUrl", form.githubUrl);
            formData.append("demoUrl", form.demoUrl);
            formData.append("image", form.imageFile);

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/projects`,
                {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                }
            );

            if (!res.ok) throw new Error("Erreur lors de l'ajout");

            const newProject = await res.json();
            onAdd(newProject);
            setMessage("Projet ajouté !");
            setForm({
                title: "",
                description: "",
                tech: "",
                githubUrl: "",
                demoUrl: "",
                imageFile: null,
            });
            setPreviewImage(null);
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div className='modal-overlay' onClick={onClose}>
            <motion.div
                className='add-project-modal'
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <button className='close-btn' onClick={onClose}>
                    ✕
                </button>
                <h2>Ajouter un projet</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        name='title'
                        placeholder='Titre'
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name='description'
                        placeholder='Description'
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name='tech'
                        placeholder='Technologies (séparées par des virgules)'
                        value={form.tech}
                        onChange={handleChange}
                    />
                    <input
                        name='githubUrl'
                        placeholder='Lien GitHub'
                        value={form.githubUrl}
                        onChange={handleChange}
                    />
                    <input
                        name='demoUrl'
                        placeholder='Lien Démo'
                        value={form.demoUrl}
                        onChange={handleChange}
                    />
                    <input
                        type='file'
                        accept='.jpg,.jpeg,.png'
                        onChange={handleImageChange}
                        required
                    />
                    {previewImage && (
                        <div className='preview'>
                            <img src={previewImage} alt='Aperçu' />
                        </div>
                    )}
                    <button type='submit'>Ajouter</button>
                    {message && <p className='message'>{message}</p>}
                </form>
            </motion.div>
        </div>
    );
}
