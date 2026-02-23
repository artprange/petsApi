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
    async updatePet(id, newData) {
        try {
            const petToUpdate = await this.repository.findOne({ where: { id } });
            if (!petToUpdate) {
                return { success: false, message: "Pet not found!" };
            }
            Object.assign(petToUpdate, newData);
            await this.repository.save(petToUpdate);
            return { success: true };
        }
        catch (error) {
            console.log(error);
            return {
                success: false,
                message: 'Something broke :('
            };
        }
    }
    deletePet(id, pet) {
        throw new Error('Method not implemented.');
    }
}
