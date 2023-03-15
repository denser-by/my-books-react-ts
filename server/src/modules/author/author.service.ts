import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/CreateAuthorDto';
const author = require('../../../models/index.js').Author;

@Injectable()
export class AuthorService {
    async create(authorCreate: CreateAuthorDto): Promise<CreateAuthorDto> {
        try {
            return await author.create({
                name: authorCreate.name,
                info: authorCreate.info,
                age: authorCreate.age,
                photo: authorCreate.photo,
                access_key: authorCreate.access_key
            });
        } catch (e) {
            throw new Error('Can not create Author, ' + e);
        }
    }

    async getAll(): Promise<CreateAuthorDto[]> {
        var { count, rows } = await author.findAndCountAll({});
        if (count >= 1)
            return rows;
        return [];
    }

    async size() {
        return await author.count();
    }

    async hasOne(id) {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await author.findAndCountAll({ where: { id: id } });
        if (count == 1 && rows[0].id == id)
            return true;
        return false;
    }

    async findOneByAccessKey(access_key) {
        if (access_key != null && access_key != undefined && access_key.length > 0) {
            var { count, rows } = await author.findAndCountAll({ where: { access_key: access_key } });
            if (count > 0)
                return rows[0];
        }
        return null;
    }

    async getOne(id: any): Promise<CreateAuthorDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await author.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        return rows[0];
    }

    async update(authorUpdate: CreateAuthorDto): Promise<CreateAuthorDto> {
        var id = authorUpdate.id;
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await author.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        rows[0].set({
            id: authorUpdate.id,
            name: authorUpdate.name,
            info: authorUpdate.info,
            age: authorUpdate.age,
            photo: authorUpdate.photo,
            access_key: authorUpdate.access_key        
        });
        rows[0].save();
        return rows[0];
    }

    async delete(id: any): Promise<CreateAuthorDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await author.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        await rows[0].destroy({ force: true, truncate: true });
        return rows[0];
    }

    async deleteAll() {
        var { count, rows } = await author.findAndCountAll({});
        if (count < 1)
            throw new Error('Objects not found, items ' + count);
        rows.map(img => async function () {
            await img.destroy({ force: true, truncate: true });
        });
        return count;
    }
}