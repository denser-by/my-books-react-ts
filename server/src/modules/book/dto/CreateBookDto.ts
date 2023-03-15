import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateBookDto {
    id: number;

    @IsString()
    @IsNotEmpty({ message: 'This book ought to have name' })
    @Length(5, 255)
    @ApiProperty()
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    info: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    year: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    cover_img: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    access_key:string;
}