import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() body: any) {
    return this.reviewsService.create(body);
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: any) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }

  /**
   * Obtener reviews de un bootcamp con calificación mayor a 3
   * @param bootcampId - ID del bootcamp
   * @returns Lista de reviews con calificaciones "buenas" o "excelentes"
   */
  @Get('bootcamp/:bootcampId/good-reviews')
  getGoodOrExcellentReviews(@Param('bootcampId') bootcampId: number) {
    return this.reviewsService.getGoodOrExcellentReviews(bootcampId);
  }
}
