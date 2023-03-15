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
    @ApiOkResponse({ type: CreateAuthorDto, isArray: true })
    async getAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number
    ): Promise<CreateAuthorDto[]> {
        return this.authorService.getAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: CreateAuthorDto })
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<CreateAuthorDto> {
        return this.authorService.getOne(id);
    }

    @Put()
    @ApiOkResponse({ type: CreateAuthorDto })
    async update(@Body() createDto: CreateAuthorDto): Promise<CreateAuthorDto> {
        return this.authorService.update(createDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: CreateAuthorDto })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<CreateAuthorDto> {
        return this.authorService.delete(id);
    }
}