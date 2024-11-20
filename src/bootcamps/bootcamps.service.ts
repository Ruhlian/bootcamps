import { Injectable, Delete, Body, NotFoundException } from '@nestjs/common';
import { CreateBootcampDto } from './dto/create-bootcamp.dto';
import { UpdateBootcampDto } from './dto/update-bootcamp.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Bootcamp } from './entities/bootcamp.entity';


@Injectable()
export class BootcampsService {


  //Inyectar: obtener una instancia del 
  //Repositorio como atributo de 
  //la clase BootcampsService: sin
  //necesidad de instanciar 
  constructor(@InjectRepository(Bootcamp) 
        private bootcampRepository:
                Repository<Bootcamp> ){
        }
  create (body: CreateBootcampDto) {
    //1. Crear una instancia de una entiti Bootcamp
    const newBootcamp = this.bootcampRepository.create(body)
    //2. grabar esa instancia
    return this.bootcampRepository.save(newBootcamp)
    ;
  }

  findAll() {
    return this.bootcampRepository.find()
  }

  findOne(id: number) {
    const b = this.bootcampRepository.findOneBy({id});
    if(!b) {
      throw new 
      NotFoundException(`No existe el Bootcamp`);
    }else{
      return b;
    }
 
  }

  async update(id: number, body: UpdateBootcampDto) {
    //1. encontrar el bootcamp por id
    const UpdBootcamp = await this.bootcampRepository.findOneBy({id});

    if(!UpdBootcamp) {
      throw new NotFoundException(`No existe el bootcamp`)
    }
    //2. hacer update: agregar cambios del payload 
    //a la entidad hallada en el punto 1 
    this.bootcampRepository.merge(UpdBootcamp, body)
    //3, grabar cambios
    return this.bootcampRepository.save(UpdBootcamp)
  }

  async remove(id: number) {
    //Buscar bootcamp por id
    const delBootcamp = await this.bootcampRepository.findOneBy({id});

    if(!delBootcamp) {
      throw new NotFoundException(`No existe`)
    }
   // borrar bootcamp
   //Borrado
    this.bootcampRepository.delete(delBootcamp)
    //3, retonar el bootcap
    //borrado
    return delBootcamp
  }
}
