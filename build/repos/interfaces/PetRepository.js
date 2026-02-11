export default class PetRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    generatePet(pet) {
        this.repository.save(pet);
    }
    listPets() {
        throw new Error('Method not implemented.');
    }
    updatePet(id, pet) {
        throw new Error('Method not implemented.');
    }
    deletePet(id, pet) {
        throw new Error('Method not implemented.');
    }
}
