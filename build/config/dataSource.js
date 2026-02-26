import { DataSource } from "typeorm";
import PetEntity from "../entities/petEntity.js";
import AdopterEntity from "../entities/adopterEntity.js";
export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/config/database.sqlite",
    entities: [PetEntity, AdopterEntity],
    synchronize: true,
});
