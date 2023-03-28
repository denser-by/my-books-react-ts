import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSettingsDto {
    @IsNumber()
    id: number;

    @IsNumber()
    @ApiProperty({ required: true })
    userId: number;

    @IsBoolean()
    @ApiProperty({ required: false })
    toasts: boolean;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    lang: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: true })
    logout_timeout: number;

    @IsNumber()
    @ApiProperty({ required: true })
    table_page_size: number;
}