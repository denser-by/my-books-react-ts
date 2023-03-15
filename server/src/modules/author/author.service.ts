import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/CreateAuthorDto';

@Injectable()
export class AuthorService {
    create(authorDto: CreateAuthorDto): CreateAuthorDto {
        authorDto.id = 123;
        return authorDto;
    }

    getAll(): CreateAuthorDto[] {
        var result = [];
        var authorDto1 = new CreateAuthorDto();
        authorDto1.id = 123;
        authorDto1.name = 'Name_123';
        authorDto1.info = 'Descr_123';
        result.push(authorDto1);
        var authorDto2 = new CreateAuthorDto();
        authorDto2.id = 321;
        authorDto2.name = 'Name_321';
        authorDto2.info = 'Descr_321';
        result.push(authorDto2);
        return result;
    }

    getOne(id: any): CreateAuthorDto {
        var authorDto = new CreateAuthorDto();
        authorDto.id = 123;
        authorDto.name = 'Name_123';
        authorDto.info = 'Descr_123';
        return authorDto;
    }

    update(authorDto: CreateAuthorDto): CreateAuthorDto {
        authorDto.name = 'Updated ' + authorDto.name;
        return authorDto;
    }

    delete(id: any): CreateAuthorDto {
        var authorDto = new CreateAuthorDto();
        authorDto.id = 123;
        authorDto.name = 'Deleted name';
        authorDto.info = 'Deleted descr';
        return authorDto;
    }
}