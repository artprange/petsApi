import PetEntity from '../../adressEntity.ts/petEntity.js'

export default interface InterfacePetRepository {
	generatePet(pet: PetEntity): void;
	listPets(): Array<PetEntity> | Promise<PetEntity[]>;
	updatePet(id: number, pet: PetEntity): void;
	deletePet(id: number, pet: PetEntity): void;
}
