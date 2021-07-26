import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('/movies')
export class MoviesController {

  constructor(private readonly moviesService: MoviesService) { }

  @Get("/")
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get("/search")
  search(@Query("title") title: string) {
    return `Searching for the movie with the title : ${title}`
  }

  @Get('/:id')
  getOne(@Param('id') movieId: number) {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData)
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch('/:id')
  update(@Param('id') movieId: number, @Body() newData: UpdateMovieDto) {
    return this.moviesService.update(movieId, newData)
  }

}
