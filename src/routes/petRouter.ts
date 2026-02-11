import express from 'express';
import PetController from '../controllers/petController.js';
import PetRepository from '../repos/interfaces/PetRepository.js';
import { AppDataSource } from '../config/dataSource.js';

const router = express.Router();

const petRepository = new PetRepository(
	AppDataSource.getRepository('PetEntity'),
);

const petController = new PetController(petRepository);

router.post('/', (req, res) => petController.generatePet(req, res));
router.get('/', (req, res) => petController.listPets(req, res));
router.put('/:id', (req, res) => petController.updatePet(req, res));
router.delete('/:id', (req, res) => petController.deletePet(req, res));

export default router;
