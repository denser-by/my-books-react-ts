import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateAuthorDto } from './dto/CreateAuthorDto';
import { AuthorService } from './author.service';

@Controller('authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) { }

    @Post()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiCreatedResponse({ type: CreateAuthorDto })
    async create(@Body() createDto: CreateAuthorDto): Promise<CreateAuthorDto> {
        return this.authorService.create(createDto);
    }

    @Get()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateAuthorDto, isArray: true })
    async getAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number
    ): Promise<CreateAuthorDto[]> {
        return this.authorService.getAll();
    }

    @Get(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateAuthorDto })
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<CreateAuthorDto> {
        return this.authorService.getOne(id);
    }

    @Put()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateAuthorDto })
    async update(@Body() createDto: CreateAuthorDto): Promise<CreateAuthorDto> {
        return this.authorService.update(createDto);
    }

    @Delete(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateAuthorDto })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<CreateAuthorDto> {
        return this.authorService.delete(id);
    }
}