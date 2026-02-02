import { Request, Response } from 'express';
import { PetType } from '../types/petType.js';

let petList: PetType[] = [];

export default class PetController {
	generatePet(req: Request, res: Response) {
		const { id, adopted, species, age, name } = <PetType>req.body;
		const newPet: PetType = { id, adopted, species, age, name };
		petList.push(newPet);
		return res.status(201).json(newPet);
	}

	listPets(req: Request, res: Response) {
		return res.status(200).json(this.listPets);
	}

	updatePet(req: Request, res: Response) {
		const id = Number(req.params.id);
		const { adopted, species, age, name } = req.body as Partial<PetType>;

		const pet = petList.find((pet) => pet.id === id);

		if (!pet) {
			return res.status(404).json({ error: 'No Pets were found' });
		}

		// update only what was provided
		if (adopted !== undefined) pet.adopted = adopted;
		if (species !== undefined) pet.species = species;
		if (age !== undefined) pet.age = age;
		if (name !== undefined) pet.name = name;

		return res.status(200).json(pet);
	}

	deletePet(req: Request, res: Response) {
		const id = Number(req.params.id);
		const pet = petList.find((pet) => pet.id === id);

		if (!pet) {
			return res.status(404).json({ error: 'No Pets were found' });
		}

		const index = petList.indexOf(pet);
		petList.splice(index, 1);
		return res.status(200).json({ message: 'Pet successfully deleted' });
	}
}
