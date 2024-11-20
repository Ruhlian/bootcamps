
import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('bootcamp')
export class BootcampController {

    @Get()
    getAllBootcamps():string {
        return "aqui se mostraran todos los bootcamps"
    }

    @Get(":id")
    getBootcampById(@Param('id') id: string): string {
        return `aqui se va a mostrar el bootcamp con id ${id}`;
    }

    @Post()
    createBootcamp(): string {
        return "Aqui se van a crear bootcamps";
    }

    @Put(":id")
    updateBootcamp(@Param('id') id:string) :string{
        return `aqui se va a actualizar el bootcamp: ${id}`
    }

    @Delete("id")
    deleteBootcamp(@Param('id') id:string) : string {
        return `aqui se va a eliminar el bootcamp con id: ${id}`
    }

}
