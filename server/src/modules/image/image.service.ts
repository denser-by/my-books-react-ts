import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/CreateImageDto';

@Injectable()
export class ImageService {
    delete(id: number): CreateImageDto | PromiseLike<CreateImageDto> {
        throw new Error('Method not implemented.');
    }
    update(createDto: CreateImageDto): CreateImageDto | PromiseLike<CreateImageDto> {
        throw new Error('Method not implemented.');
    }
    getOne(id: number): CreateImageDto | PromiseLike<CreateImageDto> {
        throw new Error('Method not implemented.');
    }
    getAll(): CreateImageDto[] | PromiseLike<CreateImageDto[]> {
        throw new Error('Method not implemented.');
    }
    create(createDto: CreateImageDto): import("./dto/CreateImageDto").CreateImageDto | PromiseLike<import("./dto/CreateImageDto").CreateImageDto> {
        throw new Error('Method not implemented.');
    }

    
}
