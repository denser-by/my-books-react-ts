import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateRoleUserDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsNumber()
    @IsNotEmpty({ message: 'This user id reference ought to be specified' })
    @ApiProperty({ required: true })
    user: number;

    @IsNumber()
    @IsNotEmpty({ message: 'This role id reference ought to be specified' })
    @ApiProperty({ required: true })
    role: number;
}