import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('bootcamps')
export class Bootcamp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 20 })
    phone: string;

    @Column('varchar', { length: 20 })
    name: string;

    @Column('varchar', { length: 20 })
    addres: string;

    @Column('text')
    topics: string;

    @Column({ name: 'average_rating' })
    averageRating: number;

    @Column({ name: 'created_at' })
    createdAt: Date;

    @OneToMany(() => Course, (course) => course.bootcamp)
    courses: Course[];

    @OneToMany(() => Review, (review) => review.bootcamp)
    reviews: Review[];

    @ManyToMany(() => User, (user) => user.bootcamps)
    users: User[];  // Relación con muchos Usuarios
}
