import { ParseIntPipe } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput, UpdateMovieInput } from './dto/index';

@Resolver(() => Movie)
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) { }

  @Mutation(() => Movie)
  createMovie(@Args('createMovieInput') createMovieInput: CreateMovieInput): Promise<Movie> {
    return this.moviesService.create(createMovieInput);
  }

  @Query(() => [Movie], { name: 'movies' })
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Query(() => Movie, { name: 'movie' })
  findOne(@Args('id', { type: () => Int }, ParseIntPipe) id: number): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Mutation(() => Movie)
  updateMovie(
    @Args('updateMovieInput') updateMovieInput: UpdateMovieInput
  ): Promise<Movie> {
    return this.moviesService.update(updateMovieInput.id, updateMovieInput);
  }

  @Mutation(() => Movie)
  removeMovie(@Args('id', { type: () => Int }, ParseIntPipe) id: number): Promise<Movie> {
    return this.moviesService.remove(id);
  }
}
