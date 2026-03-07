import { Repository } from 'typeorm'

import InterfacePetRepository from './InterfaceRepository.js'
import PetEntity from '../../entities/petEntity.js';

export default class PetRepository implements InterfacePetRepository {
	private repository: Repository<PetEntity>;

	constructor(repository: Repository<PetEntity>) {
		this.repository = repository
	}
	generatePet(pet: PetEntity): void {
		this.repository.save(pet);
	}
	async listPets(): Promise<PetEntity[]> {
		return this.repository.find()
	}

	async updatePet(id: number, newData: PetEntity): Promise<{ success: boolean; message?: string }> {
		try {
			const petToUpdate = await this.repository.findOne({ where: { id } })

			if (!petToUpdate) {
				return { success: false, message: "Pet not found!" }
			}

			Object.assign(petToUpdate, newData)

			await this.repository.save(petToUpdate);

			return { success: true }
		} catch (error) {
			console.log(error)
			return {
				success: false,
				message: 'Something broke :('
			}
		}

	}


	deletePet(id: number, pet: PetEntity): void {
		throw new Error('Method not implemented.');
	}
}


