import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/CreateImageDto';
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

    async size() {
        return await image.count();
    }

    async hasOne(id: number) {
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

    async delete(id: number): Promise<CreateImageDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await image.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        await rows[0].destroy({ force: true, truncate: true });
        return rows[0];
    }

    async deleteAll() {
        var { count, rows } = await image.findAndCountAll({});
        if (count < 1)
            throw new Error('Objects not found, items ' + count);
        rows.map(img => async function () {
            await img.destroy({ force: true, truncate: true });
        });
        return count;
    }
}