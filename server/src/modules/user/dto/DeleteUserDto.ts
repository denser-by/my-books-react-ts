import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DeleteUserDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    login: string;
}