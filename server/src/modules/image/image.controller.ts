import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
    constructor(private readonly roleService: ImageService) { }

    @Get()
    getAll(): string {
        return this.roleService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id): string {
        return this.roleService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id): string {
        return this.roleService.delete(id);
    }
}