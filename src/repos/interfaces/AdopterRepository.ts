import type { Repository } from "typeorm";
import type InterfaceAdopterRepository from "./InterfaceAdopterRepository.js";
import AdopterEntity from "../../entities/adopterEntity.js";


export default class AdopterRepository implements InterfaceAdopterRepository {
    constructor(private repository: Repository<AdopterEntity>) { }

    async generateAdopter(adopter: AdopterEntity): Promise<AdopterEntity> {
        return this.repository.save(adopter);
    }

    async listAdopters(): Promise<AdopterEntity[]> {
        return this.repository.find();
    }

    async getAdopterById(id: number): Promise<AdopterEntity | null> {
        return this.repository.findOne({ where: { id } });
    }

    async updateAdopter(id: number, patch: Partial<AdopterEntity>): Promise<AdopterEntity | null> {
        const existing = await this.getAdopterById(id);
        if (!existing) return null;

        Object.assign(existing, patch);
        return this.repository.save(existing);
    }

    async deleteAdopter(id: number): Promise<boolean> {
        const result = await this.repository.delete({ id });
        return (result.affected ?? 0) > 0;
    }
}