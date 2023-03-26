import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateCityDto } from './dto/CreateCityDto';
import { CityService } from './city.service';
import { DeleteCityDto } from './dto/DeleteCityDto';

@Controller('cities')
export class CityController {
    constructor(private readonly cityService: CityService) { }

    @Post()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiCreatedResponse({ type: CreateCityDto })
    async create(@Body() createDto: CreateCityDto): Promise<CreateCityDto> {
        return await this.cityService.create(createDto);
    }

    @Get()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateCityDto, isArray: true })
    async getAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number
    ): Promise<CreateCityDto[]> {
        return await this.cityService.getAll();
    }

    @Get(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateCityDto })
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<CreateCityDto> {
        return await this.cityService.getOne(id);
    }

    @Put()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateCityDto })
    async update(@Body() createDto: CreateCityDto): Promise<CreateCityDto> {
        return await this.cityService.update(createDto);
    }

    @Delete(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: DeleteCityDto })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteCityDto> {
        return await this.cityService.delete(id);
    }

    @Delete()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: DeleteCityDto, isArray: true })
    async deleteAll(): Promise<DeleteCityDto[]> {
        return await this.cityService.deleteAll();
    }
}