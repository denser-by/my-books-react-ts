import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class GetManyAuthorDto {
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

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    age: Date;

    @IsArray()
    @IsOptional()
    @ApiProperty({ required: false })
    books: string[];

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    photo_path: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    access_key: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    photo_data: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    updatedAt: string;
}