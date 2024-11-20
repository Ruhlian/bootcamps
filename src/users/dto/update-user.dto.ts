import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    // Ahora la actualización también permitirá un arreglo de IDs de bootcamps si se requiere.
}
