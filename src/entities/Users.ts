import {
    Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany,
} from 'typeorm';
import { Todos } from './Todos';

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Todos, todo => todo.user)
    todos: Todos[];

}