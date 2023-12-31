import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CreateMovieInput } from './create-movie.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMovieInput extends PartialType(CreateMovieInput) {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  id: number;
}
