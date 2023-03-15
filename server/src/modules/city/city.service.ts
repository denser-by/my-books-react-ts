import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/CreateCityDto';

@Injectable()
export class CityService {
    delete(id: number): CreateCityDto | PromiseLike<CreateCityDto> {
        throw new Error('Method not implemented.');
    }
    update(createDto: CreateCityDto): CreateCityDto | PromiseLike<CreateCityDto> {
        throw new Error('Method not implemented.');
    }
    getOne(id: number): CreateCityDto | PromiseLike<CreateCityDto> {
        throw new Error('Method not implemented.');
    }
    getAll(): CreateCityDto[] | PromiseLike<CreateCityDto[]> {
        throw new Error('Method not implemented.');
    }
    create(createDto: CreateCityDto): import("./dto/CreateCityDto").CreateCityDto | PromiseLike<import("./dto/CreateCityDto").CreateCityDto> {
        throw new Error('Method not implemented.');
    }

}
