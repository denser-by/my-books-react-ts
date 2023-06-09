import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateBookDto } from './dto/CreateBookDto';
import { BookService } from './book.service';
import { GetOneBookDto } from './dto/GetOneBookDto';
import { GetManyBookDto } from './dto/GetManyBookDto';
import { DeleteBookDto } from './dto/DeleteBookDto';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Post()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiCreatedResponse({ type: CreateBookDto })
    async create(@Body() createDto: CreateBookDto): Promise<CreateBookDto> {
        return await this.bookService.create(createDto);
    }

    @Get()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: GetManyBookDto, isArray: true })
    async getAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number
    ): Promise<GetManyBookDto[]> {
        return await this.bookService.getAll();
    }

    @Get(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: GetOneBookDto })
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<GetOneBookDto> {
        return await this.bookService.getOne(id);
    }

    @Put()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateBookDto })
    async update(@Body() createDto: CreateBookDto): Promise<CreateBookDto> {
        return await this.bookService.update(createDto);
    }

    @Delete(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: DeleteBookDto })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteBookDto> {
        return await this.bookService.delete(id);
    }

    @Delete()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: DeleteBookDto, isArray: true })
    async deleteAll(): Promise<DeleteBookDto[]> {
        return await this.bookService.deleteAll();
    }
}