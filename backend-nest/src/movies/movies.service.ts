import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieInput, UpdateMovieInput } from './dto/index';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {

    constructor(
        @InjectRepository(Movie)
        private readonly moviesRepository: Repository<Movie>,
    ) { }

    async create(createMovieInput: CreateMovieInput): Promise<Movie> {
        const newMovie = this.moviesRepository.create(createMovieInput);
        return await this.moviesRepository.save(newMovie);
    }

    async findAll(): Promise<Movie[]> {
        return await this.moviesRepository.find();
    }

    async findOne(id: number): Promise<Movie> {
        const movie = await this.moviesRepository.findOneBy({ id });
        if (!movie) throw new NotFoundException(`Movie with id ${id} not found`);
        return movie;
    }

    async update(id: number, updateMovieInput: UpdateMovieInput): Promise<Movie> {
        const movie = await this.moviesRepository.preload(updateMovieInput);
        if (!movie) throw new NotFoundException(`Movie with id ${id} not found`);
        return this.moviesRepository.save(movie);
    }


    async remove(id: number): Promise<Movie> {
        const movie = await this.findOne(id);
        await this.moviesRepository.remove(movie);
        return { ...movie, id  };
    }
}