import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Bootcamp } from 'src/bootcamps/entities/bootcamp.entity'
@Entity('reviews')
export class Review {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar',
             length: 100,
            nullable:false 
    })
    title: string

    @Column({type: 'text',
             nullable: false   
    })
    comment: string
    
    @Column({type:'tinyint',
            nullable:false 
    })
    rating: number

    @ManyToOne( () => Bootcamp , 
                (bootcamp) => bootcamp.reviews)

    bootcamp: Bootcamp


}
