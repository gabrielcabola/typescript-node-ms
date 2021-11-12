import express from "express";
import ImageController from '../controllers/image.controller';

const router = express.Router();

router.get("/upload/:uploadId", async (req, res) => {
  const controller = new ImageController();
  const response = await controller.getImages(req.params.uploadId);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new ImageController();
  const response = await controller.getImage(req.params.id);
  if (!response) res.status(404).send({message: "No image found"})
  return res.send(response);
});

export default router;