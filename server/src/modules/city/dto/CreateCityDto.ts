import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, isNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateCityDto {
    id: number;

    @IsString()
    @IsNotEmpty({ message: 'This city ought to have name' })
    @Length(3, 40)
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'This city ought to have About info' })
    @Length(1, 4096)
    @ApiProperty()
    description: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    sightseen: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    location: string;
}