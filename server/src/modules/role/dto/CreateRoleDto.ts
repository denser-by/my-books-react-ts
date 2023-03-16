import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateRoleDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty({ message: 'This role ought to have name' })
    @Length(3, 40)
    @ApiProperty()
    name: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @Length(3)
    @ApiProperty({ required: false })
    description: string;
}