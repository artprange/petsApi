import PetEntity from '../../entities/petEntity.js';

export default interface InterfacePetRepository {
	generatePet(pet: PetEntity): void;
	listPets(): Array<PetEntity>;
	updatePet(id: number, pet: PetEntity): void;
	deletePet(id: number, pet: PetEntity): void;
}
