import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ANIMAL_SPECIES_ENUM } from '../types/petType.js'

@Entity()
export default class PetEntity {
	@PrimaryGeneratedColumn()
	id!: number;
	@Column()
	name!: string;
	@Column()
	species!: ANIMAL_SPECIES_ENUM;
	@Column()
	dob!: string;
	@Column()
	adopted!: boolean;
}
