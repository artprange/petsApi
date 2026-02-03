import express from "express";
import PetController from "../controllers/petController.js";
const router = express.Router();
const petController = new PetController();
router.post("/", petController.generatePet);
router.get("/", petController.listPets);
router.put("/:id", petController.updatePet);
router.delete("/:id", petController.deletePet);
export default router;
