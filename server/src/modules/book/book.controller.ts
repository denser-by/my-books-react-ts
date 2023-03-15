import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateBookDto } from './dto/CreateBookDto';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Post()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiCreatedResponse({ type: CreateBookDto })
    async create(@Body() createDto: CreateBookDto): Promise<CreateBookDto> {
        return this.bookService.create(createDto);
    }

    @Get()
    @ApiOkResponse({ type: CreateBookDto, isArray: true })
    async getAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number
    ): Promise<CreateBookDto[]> {
        return this.bookService.getAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: CreateBookDto })
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<CreateBookDto> {
        return this.bookService.getOne(id);
    }

    @Put()
    @ApiOkResponse({ type: CreateBookDto })
    async update(@Body() createDto: CreateBookDto): Promise<CreateBookDto> {
        return this.bookService.update(createDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: CreateBookDto })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<CreateBookDto> {
        return this.bookService.delete(id);
    }
}