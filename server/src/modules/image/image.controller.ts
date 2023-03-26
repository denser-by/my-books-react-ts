import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateImageDto } from './dto/CreateImageDto';
import { DeleteImageDto } from './dto/DeleteImageDto';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
    constructor(private readonly imageService: ImageService) { }

    @Post()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiCreatedResponse({ type: CreateImageDto })
    async create(@Body() createDto: CreateImageDto): Promise<CreateImageDto> {
        return await this.imageService.create(createDto);
    }

    @Get()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateImageDto, isArray: true })
    async getAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number
    ): Promise<CreateImageDto[]> {
        return await this.imageService.getAll();
    }

    @Get(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateImageDto })
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<CreateImageDto> {
        return await this.imageService.getOne(id);
    }

    @Put()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateImageDto })
    async update(@Body() createDto: CreateImageDto): Promise<CreateImageDto> {
        return await this.imageService.update(createDto);
    }

    @Delete(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: DeleteImageDto })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteImageDto> {
        return await this.imageService.delete(id);
    }
}