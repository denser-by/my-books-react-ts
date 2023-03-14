import { Controller, Delete, Get, Param } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Get()
    getAll(): string {
        return this.bookService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id): string {
        return this.bookService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id): string {
        return this.bookService.delete(id);
    }
}