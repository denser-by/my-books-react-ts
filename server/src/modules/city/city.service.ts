import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/CreateCityDto';

@Injectable()
export class CityService {
    create(cityDto: CreateCityDto): CreateCityDto {
        cityDto.id = 123;
        return cityDto;
    }

    getAll(): CreateCityDto[] {
        var result = [];
        var cityDto1 = new CreateCityDto();
        cityDto1.id = 123;
        cityDto1.name = 'Name_123';
        cityDto1.description = 'Descr_123';
        result.push(cityDto1);
        var cityDto2 = new CreateCityDto();
        cityDto2.id = 321;
        cityDto2.name = 'Name_321';
        cityDto2.description = 'Descr_321';
        result.push(cityDto2);
        return result;
    }

    getOne(id: any): CreateCityDto {
        var cityDto = new CreateCityDto();
        cityDto.id = 123;
        cityDto.name = 'Name_123';
        cityDto.description = 'Descr_123';
        return cityDto;
    }

    update(cityDto: CreateCityDto): CreateCityDto {
        cityDto.name = 'Updated ' + cityDto.name;
        return cityDto;
    }

    delete(id: any): CreateCityDto {
        var cityDto = new CreateCityDto();
        cityDto.id = 123;
        cityDto.name = 'Deleted name';
        cityDto.description = 'Deleted descr';
        return cityDto;
    }
}