import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
	type: 'sqlite',
	database: './src/config/databate.sqlite',
	entities: [],
	synchronize: true,
});
