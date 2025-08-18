import { useEffect, useState } from "react";
import { fetchProjects } from "@/services/projectsService";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../components/ProjectsCard";
import ProjectModal from "../components/ProjectModal";
import AddProjectModal from "../components/AddProjectModal";
import { isAuthenticated } from "@/services/authService";
import "../styles/pages/Projects.scss";

export default function Projects() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchProjects();
                setItems(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 1,
    };

    const handleOpenModal = (project) => {
        if (!project._id) {
            console.warn("Projet cliqué sans ID :", project);
            return;
        }
        setSelectedProject(project);
    };

    const handleCloseModal = () => setSelectedProject(null);
    const handleAddClick = () => setShowAddModal(true);

    const handleAddProject = (newProject) => {
        if (newProject && newProject._id) {
            setItems((prev) => [...prev, newProject]);
            setShowAddModal(false);
        } else {
            console.warn("Projet ajouté sans ID :", newProject);
        }
    };

    const handleDeleteProject = (deletedSlug) => {
        setItems((prev) => prev.filter((p) => p.slug !== deletedSlug));
        setSelectedProject(null);
    };

    const handleNext = () => {
        if (!selectedProject) return;
        const currentIndex = items.findIndex(
            (p) => p._id === selectedProject._id
        );
        const nextIndex = (currentIndex + 1) % items.length;
        setSelectedProject(items[nextIndex]);
    };

    const handlePrev = () => {
        if (!selectedProject) return;
        const currentIndex = items.findIndex(
            (p) => p._id === selectedProject._id
        );
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        setSelectedProject(items[prevIndex]);
    };

    if (loading) return <p className='projects__loading'>Chargement…</p>;
    if (error) return <p className='projects__error'>Erreur : {error}</p>;

    return (
        <section className='projects'>
            <div className='container'>
                <h1>Mes projets</h1>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className='masonry-grid'
                    columnClassName='masonry-grid_column'
                >
                    {items.map((project) => (
                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProjectCard
                                project={project}
                                onClick={() => handleOpenModal(project)}
                            />
                        </motion.div>
                    ))}

                    {isAuthenticated() && (
                        <motion.div
                            key='add-project'
                            className='project-card add-card'
                            onClick={handleAddClick}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className='plus'>+</div>
                            <p>Ajouter un projet</p>
                        </motion.div>
                    )}
                </Masonry>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={handleCloseModal}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        onDelete={handleDeleteProject}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showAddModal && (
                    <AddProjectModal
                        onClose={() => setShowAddModal(false)}
                        onAdd={handleAddProject}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
