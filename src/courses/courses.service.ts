import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Bootcamp } from 'src/bootcamps/entities/bootcamp.entity';


@Injectable()
export class CoursesService {
  
  //Inyectar: obtener una instancia del 
  //Repositorio como atributo de 
  //la clase BootcampsService: sin
  //necesidad de instanciar 
  constructor(@InjectRepository(Course) 
                private cursoRepository:
                Repository<Course>, 
              @InjectRepository(Bootcamp) 
                private botocampRepository:
                Repository<Bootcamp> ){
        }
  async create(body: CreateCourseDto) {
      //1.Desestructurar el dto 
      const { title,weeks,minimumSkill,tuition,createdAt,bootcampId } = body
      const bootcacmpById = await this.botocampRepository.findOneBy({id:bootcampId})
      //3. crear una instancia de course
      const newCourse = new Course()
      newCourse.weeks = weeks
      newCourse.minimumSkill = minimumSkill
      newCourse.tuition = tuition
      newCourse.createdAt = createdAt
      newCourse.title = title
      //4.vincular al bootcamp 
      newCourse.bootcamp = bootcacmpById
      //5. grabat la nueva instancia de course a la course en db
      return this.cursoRepository.save(newCourse)


  }

  findAll() {
    return this.cursoRepository.find()
  }

  findOne(id: number) {
    return this.cursoRepository.findOneBy({id: id})
  }

  async update(id: number, body: UpdateCourseDto) {
    //1. encontrar el bootcamp por id
    const UpdCurso = await this.cursoRepository.findOneBy({id});
    //2. hacer update: agregar cambios del payload 
    //a la entidad hallada en el punto 1 
    this.cursoRepository.merge(UpdCurso, body)
    //3, grabar cambios
    return this.cursoRepository.save(UpdCurso)
  }

  async remove(id: number) {
    //Buscar Curso por id
    const delCurso = await this.cursoRepository.findOneBy({id});
   // borrar Curso
   //Borrado
    this.cursoRepository.delete(delCurso)
    //3, retonar el bootcap
    //borrado
    return delCurso
  }
}
