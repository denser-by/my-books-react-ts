import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DeleteCityDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    name: string;
}