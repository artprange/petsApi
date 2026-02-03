import { Request, Response } from 'express';
import ANIMAL_SPECIES_ENUM, { PetType } from '../types/petType.js';

let petList: PetType[] = [];

let id = 0;
function getId() {
	id = id + 1;
	return id;
}

export default class PetController {
	generatePet(req: Request, res: Response) {
		const body = req.body as Partial<Omit<PetType, 'id'>>;
		const errors: string[] = [];

		const requiredFields: (keyof Omit<PetType, 'id'>)[] = [
			'name',
			'species',
			'adopted',
			'dob',
		];

		for (const field of requiredFields) {
			if (body[field] === undefined || body[field] === null) {
				errors.push(`${field} is required`);
			}
		}

		if (typeof body.name !== 'string' || body.name.trim().length < 2) {
			errors.push('name must be a non-empty string (min 2 chars)');
		}

		if (typeof body.adopted !== 'boolean') {
			errors.push('adopted must be a boolean');
		}

		if (
			!body.species ||
			!Object.values(ANIMAL_SPECIES_ENUM).includes(body.species)
		) {
			errors.push(
				`species must be one of: ${Object.values(ANIMAL_SPECIES_ENUM).join(', ')}`,
			);
		}

		if (typeof body.dob !== 'string') {
			errors.push('dob must be a string (dd/mm/yyyy)');
		} else {
			const dob = body.dob.trim();

			const brDateRegex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;

			if (!brDateRegex.test(dob)) {
				errors.push('dob must be in dd/mm/yyyy format');
			} else {
				const [dd, mm, yyyy] = dob.split('/').map(Number);

				const date = new Date(yyyy, mm - 1, dd);

				const sameDay =
					date.getFullYear() === yyyy &&
					date.getMonth() === mm - 1 &&
					date.getDate() === dd;

				if (!sameDay) {
					errors.push('dob is not a valid date');
				} else if (date > new Date()) {
					errors.push('dob cannot be in the future');
				}
			}
		}

		if (errors.length) {
			return res
				.status(400)
				.json({ error: 'Validation failed', details: errors });
		}

		const newPet: PetType = {
			id: getId(),
			name: body.name!.trim(),
			species: body.species!,
			adopted: body.adopted!,
			dob: body.dob!.trim(),
		};

		petList.push(newPet);
		return res.status(201).json(newPet);
	}

	listPets(req: Request, res: Response) {
		return res.status(200).json(petList);
	}

	updatePet(req: Request, res: Response) {
		const id = Number(req.params.id);
		const { adopted, species, dob, name } = req.body as Partial<PetType>;

		const pet = petList.find((pet) => pet.id === id);

		if (!pet) {
			return res.status(404).json({ error: 'No Pets were found' });
		}

		if (adopted !== undefined) pet.adopted = adopted;
		if (species !== undefined) pet.species = species;
		if (dob !== undefined) pet.dob = dob;
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
