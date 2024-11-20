import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bootcamp } from 'src/bootcamps/entities/bootcamp.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: false })
    email: string;

    @Column({
        type: 'enum',
        enum: ['Usuario', 'Editor', 'Administrador'],
        nullable: false,
    })
    role: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @ManyToOne(() => Bootcamp, (bootcamp) => bootcamp.users)
    bootcamps: Bootcamp[];  // Relación con muchos Bootcamps
}
