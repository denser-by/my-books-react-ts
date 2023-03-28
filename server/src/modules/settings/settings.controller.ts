import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateSettingsDto } from './dto/CreateSettingsDto';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {

    constructor(private readonly settingsService: SettingsService) { }

    @Post()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiCreatedResponse({ type: CreateSettingsDto })
    async create(@Body() createDto: CreateSettingsDto): Promise<CreateSettingsDto> {
        return await this.settingsService.create(createDto);
    }

    @Get(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateSettingsDto })
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<CreateSettingsDto> {
        return await this.settingsService.getOne(id);
    }

    @Put()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateSettingsDto })
    async update(@Body() createDto: CreateSettingsDto): Promise<CreateSettingsDto> {
        return await this.settingsService.update(createDto);
    }
}