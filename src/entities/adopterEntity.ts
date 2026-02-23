
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export default class AdopterEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name: string;
    @Column()
    password: string;
    @Column()
    mobile: string;
    @Column()
    picture: string;
    @Column()
    address: string;

    constructor(
        name: string,
        password: string,
        mobile: string,
        picture: string,
        address: string
    ) {
        this.name = name;
        this.password = password;
        this.picture = picture;
        this.mobile = mobile;
        this.address = address;
    }
}