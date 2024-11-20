import { IsAlpha, IsDate, IsInt, IsNotEmpty, IsPositive, Max, Min, Matches } from 'class-validator'

export class CreateBootcampDto {

    @IsNotEmpty({message: "No debe estar vacio"})
    readonly name: string;
    @IsInt({message: "No debe ser un numero"})
    readonly phone: string;
    @IsNotEmpty( {message: "No debe estar vacio"})
    readonly addres: string;
    @IsNotEmpty( {message: "No debe estar vacio"})
    readonly topics: string;
    @IsNotEmpty( {message: "No debe estar vacio"})
    @IsPositive()
    @Min(1)
    @Max(10)
    readonly averageRating: number;


    @IsNotEmpty({message: "No debe estar vacio"})
    //Se agrego El @Matches junto son su importacion 
    //y se elimino la validacion de @IsDate 
    @Matches(/^(\d{4})-(\d{2})-(\d{2})$/, {message: "CreatedAt debe ser una fecha"})
    readonly createdAt: Date;

}
