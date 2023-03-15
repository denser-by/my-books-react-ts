import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/CreateBookDto';

@Injectable()
export class BookService {
    create(bookDto: CreateBookDto): CreateBookDto {
        bookDto.id = 123;
        return bookDto;
    }

    getAll(): CreateBookDto[] {
        var result = [];
        var bookDto1 = new CreateBookDto();
        bookDto1.id = 123;
        bookDto1.name = 'Name_123';
        bookDto1.info = 'Descr_123';
        result.push(bookDto1);
        var bookDto2 = new CreateBookDto();
        bookDto2.id = 321;
        bookDto2.name = 'Name_321';
        bookDto2.info = 'Descr_321';
        result.push(bookDto2);
        return result;
    }

    getOne(id: any): CreateBookDto {
        var bookDto = new CreateBookDto();
        bookDto.id = 123;
        bookDto.name = 'Name_123';
        bookDto.info = 'Descr_123';
        return bookDto;
    }

    update(bookDto: CreateBookDto): CreateBookDto {
        bookDto.name = 'Updated ' + bookDto.name;
        return bookDto;
    }

    delete(id: any): CreateBookDto {
        var bookDto = new CreateBookDto();
        bookDto.id = 123;
        bookDto.name = 'Deleted name';
        bookDto.info = 'Deleted descr';
        return bookDto;
    }
}