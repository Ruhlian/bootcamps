import { IsEnum, IsInt, IsNotEmpty, IsIn, IsDecimal, IsDate, Matches  } from "class-validator";

enum minimumSkill {
    'Beginner',
    'Intermediate',
    'Advanced'
}

export class CreateCourseDto {

    @IsNotEmpty({message: "No debe estar vacio"})
    @IsEnum(minimumSkill)
    readonly minimumSkill: minimumSkill

    @IsNotEmpty({message: "No debe estar vacio"})
    @IsInt()
    @IsIn([4, 8])
    weeks: number

    @IsNotEmpty({message: "No debe estar vacio"})
    title: string

    @IsNotEmpty({message: "No debe estar vacio"})
    tuition: number

    @IsNotEmpty({message: "No debe estar vacio"})
    createdAt: Date

    /*
    La clave foranea con e bootcamp
    */
   @IsInt()
   readonly bootcampId: number 



}
