import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
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
    @IsNotEmpty({ message: 'This user ought to have e-mail' })
    @Length(3, 40)
    @ApiProperty()
    email: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    phone: string;

    @IsString()
    @IsNotEmpty({ message: 'This user ought to have login' })
    @Length(3, 40)
    @ApiProperty()
    login: string;

    @IsString()
    @IsNotEmpty({ message: 'This user ought to have password' })
    @Length(3, 40)
    @ApiProperty()
    hash_password: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    favorite_color: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    avatar: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    from_city: number;
}