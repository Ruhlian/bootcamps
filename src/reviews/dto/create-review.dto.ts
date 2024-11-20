import { IsEnum, IsInt, IsNotEmpty, IsIn, IsDecimal, IsDate, Matches  } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty({message: "No debe estar vacio"})
    title: string

    @IsNotEmpty({message: "No debe estar vacio"})
    comment: string
    
    @IsNotEmpty({message: "No debe estar vacio"})
    @IsInt()
    rating: number

    @IsInt()
   readonly bootcampId: number 

}
