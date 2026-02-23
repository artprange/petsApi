export default class AdopterRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async generateAdopter(adopter) {
        return this.repository.save(adopter);
    }
}
