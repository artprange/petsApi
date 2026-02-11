import { DataSource } from 'typeorm';
import PetEntity from '../entities/petEntity.js';
export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: './src/config/databate.sqlite',
    entities: [PetEntity],
    synchronize: true,
});
