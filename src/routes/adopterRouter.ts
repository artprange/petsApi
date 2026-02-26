import { Router } from "express";
import AdoptionController from "../controllers/adopterController.js";
import { AppDataSource } from "../config/dataSource.js";
import AdopterEntity from "../entities/adopterEntity.js";
import AdopterRepository from "../repos/interfaces/AdopterRepository.js";


const router = Router();

const typeormRepo = AppDataSource.getRepository(AdopterEntity);
const adopterRepository = new AdopterRepository(typeormRepo);
const adoptionController = new AdoptionController(adopterRepository);

// POST /adopter
router.post("/", adoptionController.generateAdopter.bind(adoptionController));

export default router;


//const adopterController = new AdopterController(adopterRepository)
//router.pot('/', (req,res) => adopterController.generateAdopter(req, res))