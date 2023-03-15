import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/CreateBookDto';

@Injectable()
export class BookService {
    delete(id: number): CreateBookDto | PromiseLike<CreateBookDto> {
        throw new Error('Method not implemented.');
    }
    update(createDto: CreateBookDto): CreateBookDto | PromiseLike<CreateBookDto> {
        throw new Error('Method not implemented.');
    }
    getOne(id: number): CreateBookDto | PromiseLike<CreateBookDto> {
        throw new Error('Method not implemented.');
    }
    getAll(): CreateBookDto[] | PromiseLike<CreateBookDto[]> {
        throw new Error('Method not implemented.');
    }
    create(createDto: CreateBookDto): import("./dto/CreateBookDto").CreateBookDto | PromiseLike<import("./dto/CreateBookDto").CreateBookDto> {
        throw new Error('Method not implemented.');
    }

    
}