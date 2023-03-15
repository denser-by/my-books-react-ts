import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/CreateImageDto';

@Injectable()
export class ImageService {
    create(imageDto: CreateImageDto): CreateImageDto {
        imageDto.id = 123;
        return imageDto;
    }

    getAll(): CreateImageDto[] {
        var result = [];
        var imageDto1 = new CreateImageDto();
        imageDto1.id = 123;
        imageDto1.path = '/path/to/img/file1.jpg';
        imageDto1.image_type = 1;
        result.push(imageDto1);
        var imageDto2 = new CreateImageDto();
        imageDto2.id = 321;
        imageDto2.path = '/path/to/img/file2.jpg';
        imageDto2.image_type = 1;
        result.push(imageDto2);
        return result;
    }

    getOne(id: any): CreateImageDto {
        var imageDto = new CreateImageDto();
        imageDto.id = 123;
        imageDto.path = '/path/to/img/file1.jpg';
        imageDto.image_type = 1;
        return imageDto;
    }

    update(imageDto: CreateImageDto): CreateImageDto {
        imageDto.path = 'Updated ' + imageDto.path;
        return imageDto;
    }

    delete(id: any): CreateImageDto {
        var imageDto = new CreateImageDto();
        imageDto.id = 123;
        imageDto.path = 'Deleted ' + imageDto.path;
        imageDto.image_type = 1;
        return imageDto;
    }
}