import { Repository } from 'typeorm';
import PetEntity from '../../entities/petEntity.js';
import InterfacePetRepository from './InterfaceRepository.js';

export default class PetRepository implements InterfacePetRepository {
	private repository: Repository<PetEntity>;

	constructor(repository: Repository<PetEntity>) {
		this.repository = repository;
	}
	generatePet(pet: PetEntity): void {
		this.repository.save(pet);
	}
	listPets(): Array<PetEntity> {
		throw new Error('Method not implemented.');
	}
	updatePet(id: number, pet: PetEntity): void {
		throw new Error('Method not implemented.');
	}
	deletePet(id: number, pet: PetEntity): void {
		throw new Error('Method not implemented.');
	}
}
