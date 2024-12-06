import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Bootcamp } from 'src/bootcamps/entities/bootcamp.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Bootcamp)
    private readonly bootcampRepository: Repository<Bootcamp>,
  ) {}

  // Crear una nueva review
  async create(body: any) {
    const { title, comment, rating, bootcampId } = body;
    const bootcampById = await this.bootcampRepository.findOneBy({ id: bootcampId });

    const newReview = new Review();
    newReview.title = title;
    newReview.comment = comment;
    newReview.rating = rating;
    newReview.bootcamp = bootcampById;

    return this.reviewRepository.save(newReview);
  }

  // Obtener todas las reviews
  findAll() {
    return this.reviewRepository.find();
  }

  // Obtener una review por ID
  findOne(id: number) {
    return this.reviewRepository.findOneBy({ id });
  }

  // Actualizar una review
  async update(id: number, payload: any) {
    const updReview = await this.reviewRepository.findOneBy({ id });
    this.reviewRepository.merge(updReview, payload);
    return this.reviewRepository.save(updReview);
  }

  // Eliminar una review
  async remove(id: number) {
    const delReview = await this.reviewRepository.findOneBy({ id });
    await this.reviewRepository.delete(id);
    return delReview;
  }

  /**
   * Método para obtener reviews de un bootcamp específico con calificación > 3
   * @param bootcampId - ID del bootcamp
   * @returns Lista de reviews filtradas
   */
  async getGoodOrExcellentReviews(bootcampId: number): Promise<Review[]> {
    return await this.reviewRepository
      .createQueryBuilder('review') // Alias para la tabla "review"
      .select(['review.id', 'review.title', 'review.comment', 'review.rating']) // Selecciona columnas necesarias
      .where('review.bootcamp.id = :bootcampId', { bootcampId }) // Filtro por ID de bootcamp
      .andWhere('review.rating > :rating', { rating: 3 }) // Filtro por calificación > 3
      .getMany(); // Devuelve todos los registros encontrados
  }
}
