export default class AdopterRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async generateAdopter(adopter) {
        return this.repository.save(adopter);
    }
    async listAdopters() {
        return this.repository.find();
    }
    async getAdopterById(id) {
        return this.repository.findOne({ where: { id } });
    }
    async updateAdopter(id, patch) {
        const existing = await this.getAdopterById(id);
        if (!existing)
            return null;
        Object.assign(existing, patch);
        return this.repository.save(existing);
    }
    async deleteAdopter(id) {
        const result = await this.repository.delete({ id });
        return (result.affected ?? 0) > 0;
    }
}
