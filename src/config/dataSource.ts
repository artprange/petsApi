import { DataSource } from "typeorm";
import PetEntity from "../adressEntity.ts/petEntity.js";
import AdopterEntity from "../adressEntity.ts/adopterEntity.js";

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: "./src/config/database.sqlite",
	entities: [PetEntity, AdopterEntity],
	synchronize: true,
});