import ANIMAL_SPECIES_ENUM from '../types/petType.js';
let petList = [];
export default class PetController {
    generatePet(req, res) {
        const { id, adopted, species, age, name } = req.body;
        if (!Object.values(ANIMAL_SPECIES_ENUM).includes(species)) {
            return res.status(400).json({ error: 'Species not allowed' });
        }
        const newPet = { id, adopted, species, age, name };
        petList.push(newPet);
        return res.status(201).json(newPet);
    }
    listPets(req, res) {
        return res.status(200).json(petList);
    }
    updatePet(req, res) {
        const id = Number(req.params.id);
        const { adopted, species, age, name } = req.body;
        const pet = petList.find((pet) => pet.id === id);
        if (!pet) {
            return res.status(404).json({ error: 'No Pets were found' });
        }
        // update only what was provided
        if (adopted !== undefined)
            pet.adopted = adopted;
        if (species !== undefined)
            pet.species = species;
        if (age !== undefined)
            pet.age = age;
        if (name !== undefined)
            pet.name = name;
        return res.status(200).json(pet);
    }
    deletePet(req, res) {
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
