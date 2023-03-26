import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateBookDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    // @IsNotEmpty({ message: 'This book ought to have name' })
    // @Length(0, 255)
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

    @IsArray()
    @IsOptional()
    @ApiProperty({ required: false })
    authors: string[];

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    cover_img_path: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    access_key: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    cover_img_data: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    updatedAt: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    authorsNum: number;
}