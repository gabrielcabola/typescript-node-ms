import express from "express";
import UploadController from '../controllers/upload.controller';

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new UploadController();
  const response = await controller.getUploads();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new UploadController();
  const response = await controller.createUpload(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new UploadController();
  const response = await controller.getUpload(req.params.id);
  if (!response) res.status(404).send({message: "No Upload found"})
  return res.send(response);
});

export default router;