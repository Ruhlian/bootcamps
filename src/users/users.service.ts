import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Bootcamp } from 'src/bootcamps/entities/bootcamp.entity';

@Injectable()
export class UsersService {
  // Inyección de los repositorios
  constructor(
    @InjectRepository(User)
    private usuarioRepository: Repository<User>,
    @InjectRepository(Bootcamp)
    private bootcampRepository: Repository<Bootcamp>,
  ) {}

  // Crear un nuevo usuario asociado a varios bootcamps
  async create(payload: CreateUserDto) {
    const { name, email, role, password, bootcamps } = payload;

    // Buscar los Bootcamps relacionados usando los IDs
    const bootcampEntities = await this.bootcampRepository.findByIds(bootcamps);

    if (bootcampEntities.length !== bootcamps.length) {
      throw new Error(`Algunos Bootcamps no fueron encontrados`);
    }

    // Crear una nueva instancia de User
    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.role = role;
    newUser.password = password;

    // Asociar el usuario a los Bootcamps
    newUser.bootcamps = bootcampEntities;

    // Guardar el usuario en la base de datos
    return this.usuarioRepository.save(newUser);
  }

  // Obtener todos los usuarios con los bootcamps asociados
  findAll() {
    return this.usuarioRepository.find({ relations: ['bootcamps'] });
  }

  // Obtener un usuario por ID con los bootcamps asociados
  findOne(id: number) {
    return this.usuarioRepository.findOne({
      where: { id },
      relations: ['bootcamps'],
    });
  }

  // Actualizar un usuario con nuevos bootcamps (si es necesario)
  async update(id: number, payload: UpdateUserDto) {
    const { bootcamps, ...updateData } = payload;

    // Buscar el usuario existente
    const existingUser = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['bootcamps'], // Cargar la relación bootcamps
    });

    if (!existingUser) {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }

    // Actualizar los bootcamps si se proporcionan
    if (bootcamps) {
      const bootcampEntities = await this.bootcampRepository.findByIds(bootcamps);
      if (bootcampEntities.length !== bootcamps.length) {
        throw new Error(`Algunos Bootcamps no fueron encontrados`);
      }
      existingUser.bootcamps = bootcampEntities;
    }

    // Actualizar los demás datos del usuario
    this.usuarioRepository.merge(existingUser, updateData);

    // Guardar los cambios
    return this.usuarioRepository.save(existingUser);
  }

  // Eliminar un usuario
  async remove(id: number) {
    // Buscar el usuario por ID
    const userToDelete = await this.usuarioRepository.findOneBy({ id });

    if (!userToDelete) {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }

    // Eliminar el usuario
    await this.usuarioRepository.delete(id);

    return userToDelete;
  }
}
