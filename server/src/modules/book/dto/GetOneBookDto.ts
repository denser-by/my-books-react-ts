import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class GetOneBookDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
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

    @IsArray()
    @IsOptional()
    @ApiProperty({ required: false })
    authorNames: string[];

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
}