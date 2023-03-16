import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateAuthorDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty({ message: 'This author ought to have name' })
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
    age: number;

    @IsArray()
    @IsOptional()
    @ApiProperty({ required: false })
    books: number[];

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    photo: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    access_key: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    photo_path: string;
}