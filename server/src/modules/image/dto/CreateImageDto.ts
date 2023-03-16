
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateImageDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    // @IsNotEmpty({ message: 'This image ought to have path' })
    // @Length(5, 2048)
    @IsOptional()
    @ApiProperty({ required: false })
    path: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    mini_copy: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    image_type: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    file_size: number;
}