import { Controller, Delete, Get, Param } from '@nestjs/common';
import { AuthorService } from './author.service';

@Controller('authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) { }

    @Get()
    getAll(): string {
        return this.authorService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id): string {
        return this.authorService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id): string {
        return this.authorService.delete(id);
    }
}