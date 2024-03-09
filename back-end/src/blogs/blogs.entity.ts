import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Blog {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column()
    @IsNotEmpty()
    userId:number

    @Column()
    @IsNotEmpty()
    blogTitle:string;

    @Column()
    @IsNotEmpty()
    aboutBlog:string
}