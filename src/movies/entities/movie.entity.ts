import { Field, ObjectType} from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'movies'})
@ObjectType()
export class Movie {
  @PrimaryGeneratedColumn()
  @Field(()=>Number, {description: 'Unique identifier'})
  id: number;
  @Column({unique: true})
  @Field(()=>String, {description: 'Movie title'})
  title: string;
  @Column()
  @Field(()=>String, {description: 'Movie overview'})
  overview: string;
  //@Column()
  //genre: String;
  //@Column()
  //image_urls: String[];
  @CreateDateColumn()
  created_date: Date;
  @UpdateDateColumn()
  last_modified_date: Date;
}
