import express from 'express';
import AdoptionController from "../controllers/adopterController.js";
import { AppDataSource } from '../config/dataSource.js';
import AdopterRepository from '../repos/interfaces/AdopterRepository.js';
const router = express.Router();
const adopterRepository = new AdopterRepository(AppDataSource.getRepository('PetEntity'));
const adoptionController = new AdoptionController(adopterRepository);
router.post("/adopters", adoptionController.generateAdopter.bind(adoptionController));
export default router;
