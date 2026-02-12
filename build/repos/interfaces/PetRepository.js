export default class PetRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    generatePet(pet) {
        this.repository.save(pet);
    }
    async listPets() {
        return this.repository.find();
    }
    updatePet(id, pet) {
        throw new Error('Method not implemented.');
    }
    deletePet(id, pet) {
        throw new Error('Method not implemented.');
    }
}
