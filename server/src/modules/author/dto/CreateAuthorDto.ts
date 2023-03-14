import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateAuthorDto {
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

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    photo: number;
}