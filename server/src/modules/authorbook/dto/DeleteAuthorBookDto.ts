import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class DeleteAuthorBookDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: true })
    author: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: true })
    book: number;
}