enum ANIMAL_SPECIES_ENUM  {
    FELINE = 'cat',
    CANINE = 'dog'
}

type PetType = {
    id: number;
    name: string;
    species: ANIMAL_SPECIES_ENUM;
    adopted: boolean;
    dob: string
}

export type { PetType}
export default ANIMAL_SPECIES_ENUM