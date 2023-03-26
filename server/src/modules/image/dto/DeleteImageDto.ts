
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DeleteImageDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    path: string;
}