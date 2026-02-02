enum ANIMAL_SPECIES_ENUM  {
    FELINE = 'cat',
    CANINE = 'dog'
}

type PetType = {
    id: number;
    name: string;
    species: ANIMAL_SPECIES_ENUM;
    adopted: boolean;
    age: number
}

export type { PetType, ANIMAL_SPECIES_ENUM  }