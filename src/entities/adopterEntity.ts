import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column("text", { nullable: true })
    address!: string | null;

    constructor(partial?: Partial<AdopterEntity>) {
        Object.assign(this, partial);
    }
}