import express from "express";
import HealthController from "../controllers/health.controller";
import UploadRouter from "./upload.router";
import ImageRouter from "./images.router";

const router = express.Router();

router.get("/health-check", async (_req, res) => {
  const controller = new HealthController();
  const response = await controller.getMessage();
  return res.send(response);
});
router.use("/upload", UploadRouter)
router.use("/image", ImageRouter)

export default router;
