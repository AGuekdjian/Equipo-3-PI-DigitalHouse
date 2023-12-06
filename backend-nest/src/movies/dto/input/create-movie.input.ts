import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateMovieInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  title: string;
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  overview: string;
  //@Column()
  //genre: String;
  //@Column()
  //image_urls: String[];
}
