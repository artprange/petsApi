import type AdopterEntity from "../../entities/adopterEntity.js";

export default interface InterfaceAdopterRepository {
    generateAdopter(adopter: AdopterEntity): Promise<AdopterEntity>;
    listAdopters(): Promise<AdopterEntity[]>;
    getAdopterById(id: number): Promise<AdopterEntity | null>;
    updateAdopter(id: number, patch: Partial<AdopterEntity>): Promise<AdopterEntity | null>;
    deleteAdopter(id: number): Promise<boolean>;
}