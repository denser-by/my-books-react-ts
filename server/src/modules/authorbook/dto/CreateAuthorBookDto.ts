import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAuthorBookDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsNumber()
    @IsNotEmpty({ message: 'This author id reference ought to be specified' })
    @ApiProperty({ required: true })
    author: number;

    @IsNumber()
    @IsNotEmpty({ message: 'This book id reference ought to be specified' })
    @ApiProperty({ required: true })
    book: number;
}