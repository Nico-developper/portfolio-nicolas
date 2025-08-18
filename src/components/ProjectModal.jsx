import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { isAuthenticated, getToken } from "@/services/authService";
import "../styles/components/ProjectModal.scss";

export default function ProjectModal({
    project,
    onClose,
    onPrev,
    onNext,
    onDelete,
}) {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tech: "",
        githubUrl: "",
        demoUrl: "",
        imageFile: null,
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (project) {
            setFormData({
                ...project,
                tech: project.tech?.join(", ") || "",
                imageFile: null,
            });
        }
    }, [project]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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

        setFormData({ ...formData, imageFile: file });
        setPreviewImage(URL.createObjectURL(file));
        setMessage("");
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = getToken();
            const form = new FormData();

            form.append("title", formData.title);
            form.append("description", formData.description);
            form.append("tech", formData.tech);
            form.append("githubUrl", formData.githubUrl);
            form.append("demoUrl", formData.demoUrl);
            if (formData.imageFile) {
                form.append("image", formData.imageFile);
            }

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/projects/${project.slug}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: form,
                }
            );

            if (!res.ok) throw new Error("Erreur lors de la mise à jour");

            setMessage("Projet mis à jour !");
            setEditMode(false);
            onClose();
        } catch (err) {
            setMessage(err.message);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Es-tu sûr de vouloir supprimer ce projet ?"
        );
        if (!confirmDelete) return;

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/projects/${project.slug}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                }
            );

            if (!res.ok) throw new Error("Erreur lors de la suppression");

            alert("Projet supprimé !");
            onDelete(project.slug);
            onClose();
        } catch (err) {
            alert(err.message);
        }
    };

    if (!project) return null;

    return (
        <motion.div
            className='modal-backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className='modal-content'
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <button
                    className='close-btn'
                    onClick={onClose}
                    aria-label='Fermer'
                >
                    <X />
                </button>

                {editMode ? (
                    <form onSubmit={handleUpdate} className='edit-form'>
                        <input
                            name='title'
                            value={formData.title}
                            onChange={handleChange}
                            placeholder='Titre'
                            required
                        />
                        <input
                            name='tech'
                            value={formData.tech}
                            onChange={handleChange}
                            placeholder='Technologies'
                        />
                        <textarea
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                            placeholder='Description'
                            required
                        />
                        <input
                            name='githubUrl'
                            value={formData.githubUrl}
                            onChange={handleChange}
                            placeholder='Lien GitHub'
                        />
                        <input
                            name='demoUrl'
                            value={formData.demoUrl}
                            onChange={handleChange}
                            placeholder='Lien Démo'
                        />
                        <input
                            type='file'
                            accept='.jpg,.jpeg,.png'
                            onChange={handleImageChange}
                        />
                        {previewImage && (
                            <div className='preview'>
                                <img src={previewImage} alt='Aperçu' />
                            </div>
                        )}
                        <div className='form-buttons'>
                            <button type='submit'>Valider</button>
                            <button
                                type='button'
                                onClick={() => setEditMode(false)}
                            >
                                Annuler
                            </button>
                        </div>
                        {message && <p className='message'>{message}</p>}
                    </form>
                ) : (
                    <>
                        <div className='modal-image'>
                            <img src={project.coverImage} alt={project.title} />
                        </div>
                        <h2>{project.title}</h2>
                        <p className='tech'>{project.tech?.join(" · ")}</p>
                        <p className='desc'>{project.description}</p>
                        <div className='links'>
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    GitHub
                                </a>
                            )}
                            {project.demoUrl && (
                                <a
                                    href={project.demoUrl}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    Démo
                                </a>
                            )}
                        </div>
                        {isAuthenticated() && (
                            <div className='admin-actions'>
                                <button
                                    className='edit-btn'
                                    onClick={() => setEditMode(true)}
                                >
                                    Modifier
                                </button>
                                <button
                                    className='delete-btn'
                                    onClick={handleDelete}
                                >
                                    Supprimer
                                </button>
                            </div>
                        )}
                    </>
                )}

                <div className='nav-buttons'>
                    <button onClick={onPrev} aria-label='Projet précédent'>
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={onNext} aria-label='Projet suivant'>
                        <ChevronRight size={24} />
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
