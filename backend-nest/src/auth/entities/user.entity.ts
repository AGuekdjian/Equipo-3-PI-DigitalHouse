import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column('text', { unique: true })
    email: string;
    @Column('text', {select : false})
    password: string;
    @Column('text')
    name: string;
    @Column()
    last_name: string;
    @Column('bool', { default: true })
    isActive: boolean;
    @Column('text', { default: 'ROLE_USER' })
    role: string;
    @CreateDateColumn()
    created_date: Date;
    @UpdateDateColumn()
    last_modified_date: Date;

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }
    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}
