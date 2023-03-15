import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/CreateRoleDto';
const role = require('../../../models/index.js').Role;

@Injectable()
export class RoleService {
    async create(roleCreate: CreateRoleDto): Promise<CreateRoleDto> {
        try {
            return await role.create({
                name: roleCreate.name,
                description: roleCreate.description
            });
        } catch (e) {
            throw new Error('Can not create Role, ' + e);
        }
    }

    async getAll(): Promise<CreateRoleDto[]> {
        var { count, rows } = await role.findAndCountAll({});
        if (count >= 1)
            return rows;
        return [];
    }

    async size() {
        return await role.count();
    }

    async hasOne(id) {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await role.findAndCountAll({ where: { id: id } });
        if (count == 1 && rows[0].id == id)
            return true;
        return false;
    }

    async findOneByName(name) {
        if (name != null && name != undefined && name.length > 0) {
            var { count, rows } = await role.findAndCountAll({ where: { name: name } });
            if (count > 0)
                return rows[0];
        }
        return null;
    }

    async getOne(id: any): Promise<CreateRoleDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await role.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        return rows[0];
    }

    async update(roleUpdate: CreateRoleDto): Promise<CreateRoleDto> {
        var id = roleUpdate.id;
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await role.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        rows[0].set({
            id: roleUpdate.id,
            name: roleUpdate.name,
            description: roleUpdate.description
        });
        rows[0].save();
        return rows[0];
    }

    async delete(id: any): Promise<CreateRoleDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await role.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        await rows[0].destroy({ force: true, truncate: true });
        return rows[0];
    }

    async deleteAll() {
        var { count, rows } = await role.findAndCountAll({});
        if (count < 1)
            throw new Error('Objects not found, items ' + count);
        rows.map(img => async function () {
            await img.destroy({ force: true, truncate: true });
        });
        return count;
    }
}