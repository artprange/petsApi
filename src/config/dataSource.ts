import { DataSource } from "typeorm";
import PetEntity from "../entities/petEntity.js";
import AdopterEntity from "../entities/adopterEntity.js";
import AddressEntity from "../entities/adressEntity.js";


export const AppDataSource = new DataSource({
	type: "sqlite",
	database: "./src/config/database.sqlite",
	entities: [PetEntity, AdopterEntity, AddressEntity],
	synchronize: true,
});