import { Router } from "express";
import multer from "multer";
import {
    listProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
} from "../controllers/projectController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 },
});
router.get("/", listProjects);

router.get("/:slug", getProject);
router.post("/", requireAuth, upload.single("image"), createProject);
router.put("/:slug", requireAuth, upload.single("image"), updateProject);
router.delete("/:slug", requireAuth, deleteProject);

export default router;
