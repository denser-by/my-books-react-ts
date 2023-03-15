import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateCityDto } from './dto/CreateCityDto';
import { CityService } from './city.service';

@Controller('cities')
export class CityController {
    constructor(private readonly cityService: CityService) { }

    @Post()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiCreatedResponse({ type: CreateCityDto })
    async create(@Body() createDto: CreateCityDto): Promise<CreateCityDto> {
        return this.cityService.create(createDto);
    }

    @Get()
    @ApiOkResponse({ type: CreateCityDto, isArray: true })
    async getAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number
    ): Promise<CreateCityDto[]> {
        return this.cityService.getAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: CreateCityDto })
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<CreateCityDto> {
        return this.cityService.getOne(id);
    }

    @Put()
    @ApiOkResponse({ type: CreateCityDto })
    async update(@Body() createDto: CreateCityDto): Promise<CreateCityDto> {
        return this.cityService.update(createDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: CreateCityDto })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<CreateCityDto> {
        return this.cityService.delete(id);
    }
}