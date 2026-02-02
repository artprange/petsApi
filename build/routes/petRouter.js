import express from "express";
import PetController from "../controllers/petController.js";
const router = express.Router();
const petController = new PetController();
router.post("/", petController.generatePet);
export default router;
