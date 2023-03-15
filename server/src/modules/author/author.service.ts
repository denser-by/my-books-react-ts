import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/CreateAuthorDto';

@Injectable()
export class AuthorService {
    delete(id: number): CreateAuthorDto | PromiseLike<CreateAuthorDto> {
        throw new Error('Method not implemented.');
    }
    update(createDto: CreateAuthorDto): CreateAuthorDto | PromiseLike<CreateAuthorDto> {
        throw new Error('Method not implemented.');
    }
    getOne(id: number): CreateAuthorDto | PromiseLike<CreateAuthorDto> {
        throw new Error('Method not implemented.');
    }
    getAll(): CreateAuthorDto[] | PromiseLike<CreateAuthorDto[]> {
        throw new Error('Method not implemented.');
    }
    create(createDto: CreateAuthorDto): import("./dto/CreateAuthorDto").CreateAuthorDto | PromiseLike<import("./dto/CreateAuthorDto").CreateAuthorDto> {
        throw new Error('Method not implemented.');
    }

}