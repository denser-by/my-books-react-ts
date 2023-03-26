import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateAuthorDto } from './dto/CreateAuthorDto';
import { AuthorService } from './author.service';
import { GetOneAuthorDto } from './dto/GetOneAuthorDto';
import { GetManyAuthorDto } from './dto/GetManyAuthorDto';
import { DeleteAuthorDto } from './dto/DeleteAuthorDto';

@Controller('authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) { }

    @Post()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiCreatedResponse({ type: CreateAuthorDto })
    async create(@Body() createDto: CreateAuthorDto): Promise<CreateAuthorDto> {
        return await this.authorService.create(createDto);
    }

    @Get()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: GetManyAuthorDto, isArray: true })
    async getAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number
    ): Promise<GetManyAuthorDto[]> {
        return await this.authorService.getAll();
    }

    @Get(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: GetOneAuthorDto })
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<GetOneAuthorDto> {
        return await this.authorService.getOne(id);
    }

    @Put()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateAuthorDto })
    async update(@Body() createDto: CreateAuthorDto): Promise<CreateAuthorDto> {
        return await this.authorService.update(createDto);
    }

    @Delete(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: DeleteAuthorDto })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteAuthorDto> {
        return await this.authorService.delete(id);
    }

    @Delete()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: DeleteAuthorDto, isArray: true })
    async deleteAll(): Promise<DeleteAuthorDto[]> {
        return await this.authorService.deleteAll();
    }
}