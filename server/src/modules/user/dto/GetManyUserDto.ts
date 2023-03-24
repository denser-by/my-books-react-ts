import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetManyUserDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    first_name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    last_name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    email: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    phone: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    login: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    from_city: number;
}