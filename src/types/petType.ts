export enum ANIMAL_SPECIES_ENUM {
	FELINE = 'cat',
	CANINE = 'dog',
}

export type PetType = {
	id: number;
	name: string;
	species: ANIMAL_SPECIES_ENUM;
	adopted: boolean;
	dob: string;
};
