import { Controller, Delete, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('cities')
export class CityController {
    constructor(private readonly roleService: CityService) { }

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