
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateImageDto {
    id: number;

    @IsString()
    @IsNotEmpty({ message: 'This image ought to have path' })
    @Length(5, 2048)
    @ApiProperty()
    path: string;

    @IsOptional()
    @ApiProperty({ required: false })
    mini_copy: object;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    image_type: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ required: false })
    file_size: number;
}