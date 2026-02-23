import type AdopterEntity from "../../entities/adopterEntity.js";

export default interface InterfaceAdopterRepository {
    generateAdopter(adopter: AdopterEntity): Promise<AdopterEntity>;
}