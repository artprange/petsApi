import { Repository } from "typeorm";
import type InterfaceAdopterRepository from "./InterfaceAdopterRepository.js";
import AdopterEntity from "../../entities/adopterEntity.js";

export default class AdopterRepository implements InterfaceAdopterRepository {
    constructor(private repository: Repository<AdopterEntity>) { }

    async generateAdopter(adopter: AdopterEntity): Promise<AdopterEntity> {
        return this.repository.save(adopter);
    }
}