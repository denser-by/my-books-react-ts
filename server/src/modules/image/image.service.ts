import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/CreateImageDto';
import { DeleteImageDto } from './dto/DeleteImageDto';
const image = require('../../../models/index.js').Image;

@Injectable()
export class ImageService {
    async create(imageCreate: CreateImageDto): Promise<CreateImageDto> {
        try {
            return await image.create({
                path: imageCreate.path,
                mini_copy: imageCreate.mini_copy,
                image_type: imageCreate.image_type,
                file_size: imageCreate.file_size
            });
        } catch (e) {
            throw new Error('Can not create Image, ' + e);
        }
    }

    async getAll(): Promise<CreateImageDto[]> {
        var { count, rows } = await image.findAndCountAll({});
        if (count >= 1)
            return rows;
        return [];
    }

    async size(): Promise<number> {
        return await image.count();
    }

    async hasOne(id: number): Promise<boolean> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await image.findAndCountAll({ where: { id: id } });
        if (count == 1 && rows[0].id == id)
            return true;
        return false;
    }

    async findOneByPath(path: string) {
        if (path != null && path != undefined && path.length > 0) {
            var { count, rows } = await image.findAndCountAll({ where: { path: path } });
            if (count > 0)
                return rows[0];
        }
        return null;
    }

    async findOneByData(data: string) {
        if (data != null && data != undefined && data.length > 0) {
            var { count, rows } = await image.findAndCountAll({ where: { mini_copy: data } });
            if (count > 0)
                return rows[0];
        }
        return null;
    }

    async getOne(id: number): Promise<CreateImageDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await image.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        return rows[0];
    }

    async update(imageUpdate: CreateImageDto): Promise<CreateImageDto> {
        var id = imageUpdate.id;
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await image.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        rows[0].set({
            id: imageUpdate.id,
            path: imageUpdate.path,
            mini_copy: imageUpdate.mini_copy,
            image_type: imageUpdate.image_type,
            file_size: imageUpdate.file_size
        });
        rows[0].save();
        return rows[0];
    }

    private async prepareDtoDelete(ref: any): Promise<DeleteImageDto> {
        let result = new DeleteImageDto();
        result.id = ref.id;
        result.path = ref.path;
        return result;
    }

    async delete(id: number): Promise<DeleteImageDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await image.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        await rows[0].destroy({ force: true, truncate: true });
        let result = await this.prepareDtoDelete(rows[0]);
        return result;
    }

    async deleteAll(): Promise<DeleteImageDto[]> {
        var { count, rows } = await image.findAndCountAll({});
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