import { Injectable } from '@nestjs/common';
import { ImageService } from '../image/image.service';
import { CreateCityDto } from './dto/CreateCityDto';
import { DeleteCityDto } from './dto/DeleteCityDto';
const city = require('../../../models/index.js').City;

@Injectable()
export class CityService {

    constructor(private readonly imageService: ImageService) { }

    async create(cityCreate: CreateCityDto): Promise<CreateCityDto> {
        try {
            return await city.create({
                name: cityCreate.name,
                description: cityCreate.description,
                sightseen: cityCreate.sightseen,
                location: cityCreate.location
            });
        } catch (e) {
            throw new Error('Can not create City, ' + e);
        }
    }

    async getAll(): Promise<CreateCityDto[]> {
        var { count, rows } = await city.findAndCountAll({});
        if (count >= 1)
            return rows;
        return [];
    }

    async size(): Promise<number> {
        return await city.count();
    }

    async hasOne(id: number): Promise<boolean> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await city.findAndCountAll({ where: { id: id } });
        if (count == 1 && rows[0].id == id)
            return true;
        return false;
    }

    async findOneByName(name: string) {
        if (name != null && name != undefined && name.length > 0) {
            var { count, rows } = await city.findAndCountAll({ where: { name: name } });
            if (count > 0)
                return rows[0];
        }
        return null;
    }

    async getOne(id: number): Promise<CreateCityDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await city.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        return rows[0];
    }

    async update(cityUpdate: CreateCityDto): Promise<CreateCityDto> {
        var id = cityUpdate.id;
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await city.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        rows[0].set({
            id: cityUpdate.id,
            name: cityUpdate.name,
            description: cityUpdate.description,
            sightseen: cityUpdate.sightseen,
            location: cityUpdate.location
        });
        rows[0].save();
        return rows[0];
    }

    private async prepareDtoDelete(ref: any): Promise<DeleteCityDto> {
        let result = new DeleteCityDto();
        result.id = ref.id;
        result.name = ref.name;
        return result;
    }

    async delete(id: number): Promise<DeleteCityDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await city.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        await rows[0].destroy({ force: true, truncate: true });
        let result = await this.prepareDtoDelete(rows[0]);
        return result;
    }

    async deleteAll(): Promise<DeleteCityDto[]> {
        var { count, rows } = await city.findAndCountAll({});
        if (count < 1)
            throw new Error('Objects not found, items ' + count);
        let result = [];
        for (let i = 0; i < rows.length; i++) {
            result.push(await this.prepareDtoDelete(rows[i]));
            await rows[i].destroy({ force: true, truncate: true });
        }
        return result;
    }
}