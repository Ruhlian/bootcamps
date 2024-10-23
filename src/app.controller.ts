import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { student } from './entities/student.entity';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //endpoint: puerta del software
  //          - Acepta peticiones de clientes bajo una url
  //          - Retorna el(los) datos esperados al cliente
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //Segundo endpoint - ESTRUCTURAR UN ENDPOINT
  // 1. Verbo(Metodo) Http sobre el cual recibir
  // Metodos disponibles: GET, POST, PUT, DELETE
  // junto con la ruta a invocar
  // 2.Firma del metodo a ejecutar
  // cuando se invoque el enddpoint
  @Get("/ficha")
  getFicha(): string {
    return "endpoint de la ficha 2902093"
  }

  //tercer endpoint
  @Get("/identificacion/:id/ciudad/:ciudad")
  identificacion(@Param ('id') id:string,
                 @Param('ciudad') ciudad:string,
                 @Query('nombre') nombre:string,
                 @Query('edad') edad:number): student{
    return new student(+id,nombre , edad, ciudad);
  } 
}
