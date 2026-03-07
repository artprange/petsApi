import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import AddressEntity from "./adressEntity.js";

@Entity()
export default class AdopterEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    name!: string;

    @Column("text")
    password!: string;

    @Column("text")
    mobile!: string;

    @Column("text", { nullable: true })
    picture!: string | null;

    @OneToOne(() => AddressEntity, { nullable: true, cascade: true, eager: true })
    @JoinColumn()
    address!: AddressEntity | null;

    constructor(partial?: Partial<AdopterEntity>) {
        Object.assign(this, partial);
    }
}