import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class DeleteRoleUserDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: true })
    user: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: true })
    role: number;
}