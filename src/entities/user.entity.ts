import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Profile } from "./profile.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', unique: true})
    username: string;

    @Column({type: 'text'})
    password: string;

    @Column({default: false, name: 'is_active'})
    isActive: boolean;

    @OneToOne(() => Profile, profile => profile.user, {cascade: true})
    @JoinColumn({name: 'profile_id'})
    profile: Profile;
}