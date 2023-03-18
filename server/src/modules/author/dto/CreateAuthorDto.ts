import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateAuthorDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    // @IsNotEmpty({ message: 'This author ought to have name' })
    // @Length(0, 255)
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
    books: number[];

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