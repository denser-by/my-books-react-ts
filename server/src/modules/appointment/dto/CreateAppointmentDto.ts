import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateAppointmentDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    description: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    location: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    address: string;

    @IsString()
    @ApiProperty({ required: false })
    date: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    city: number;

    @IsNumber()
    @IsNotEmpty({ message: 'This appointment ought to have book reference' })
    @ApiProperty()
    book: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    map: number;
}