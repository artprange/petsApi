import express from "express";
import AdoptionController from "../controllers/adopterController.js";
import { AppDataSource } from "../config/dataSource.js";
import AdopterEntity from "../adressEntity.ts/adopterEntity.js";
import AdopterRepository from "../repos/interfaces/AdopterRepository.js";

const router = express.Router();

const typeormRepo = AppDataSource.getRepository(AdopterEntity);
const adopterRepository = new AdopterRepository(typeormRepo);
const controller = new AdoptionController(adopterRepository);

router.post("/", controller.generateAdopter.bind(controller));
router.get("/", controller.listAdopters.bind(controller));
router.get("/:id", controller.getAdopter.bind(controller));
router.put("/:id", controller.updateAdopter.bind(controller));
router.delete("/:id", controller.deleteAdopter.bind(controller));

export default router;



