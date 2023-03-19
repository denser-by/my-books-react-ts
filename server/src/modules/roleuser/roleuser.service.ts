import { Injectable } from '@nestjs/common';
import { CreateRoleUserDto } from './dto/CreateRoleUserDto';
const roleuser = require('../../../models/index.js').UserRole;

@Injectable()
export class RoleuserService {
    async create(roleuserCreate: CreateRoleUserDto): Promise<CreateRoleUserDto> {
        try {
            return await roleuser.create({
                user: roleuserCreate.user,
                role: roleuserCreate.role
            });
        } catch (e) {
            throw new Error('Can not create Roleuser, ' + e);
        }
    }

    async getAll(): Promise<CreateRoleUserDto[]> {
        var { count, rows } = await roleuser.findAndCountAll({});
        if (count >= 1)
            return rows;
        return [];
    }

    async getAllByUser(user: number): Promise<CreateRoleUserDto[]> {
        var { count, rows } = await roleuser.findAndCountAll({ where: { user: user } });
        if (count >= 1)
            return rows;
        return [];
    }

    async getAllByRole(role: number): Promise<CreateRoleUserDto[]> {
        var { count, rows } = await roleuser.findAndCountAll({ where: { role: role } });
        if (count >= 1)
            return rows;
        return [];
    }

    async size() {
        return await roleuser.count();
    }

    async sizeByUser(user: number) {
        var { count, rows } = await roleuser.findAndCountAll({ where: { user: user } });
        return count >= 1 ? count : 0;
    }

    async sizeByRole(role: number) {
        var { count, rows } = await roleuser.findAndCountAll({ where: { role: role } });
        return count >= 1 ? count : 0;
    }

    async hasOne(user: number, role: number) {
        if (user == null || user == undefined || user < 0 || role == null || role == undefined || role < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await roleuser.findAndCountAll({ where: { user: user, role: role } });
        if (count == 1 && rows[0].user == user && rows[0].role == role)
            return true;
        return false;
    }

    async getOne(user: number, role: number): Promise<CreateRoleUserDto> {
        if (user == null || user == undefined || user < 0 || role == null || role == undefined || role < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await roleuser.findAndCountAll({ where: { user: user, role: role } });
        if (count == 1 && rows[0].user == user && rows[0].role == role)
            return rows[0];
        throw new Error('Object not found, user=' + user + ' role=' + role);
    }

    async update(roleuserUpdate: CreateRoleUserDto): Promise<CreateRoleUserDto> {
        var id = roleuserUpdate.id;
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await roleuser.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        rows[0].set({
            id: roleuserUpdate.id,
            user: roleuserUpdate.user,
            role: roleuserUpdate.role
        });
        rows[0].save();
        return rows[0];
    }

    async delete(id: number): Promise<CreateRoleUserDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await roleuser.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        await rows[0].destroy({ force: true, truncate: true });
        return rows[0];
    }

    async deleteByUserRole(user: number, role: number): Promise<CreateRoleUserDto> {
        if (user == null || user == undefined || user < 0 || role == null || role == undefined || role < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await roleuser.findAndCountAll({ where: { user: user, role: role } });
        if (count != 1)
            throw new Error('Object not found, user=' + user + ' role=' + role);
        await rows[0].destroy({ force: true, truncate: true });
        return rows[0];
    }

    async deleteAll() {
        var { count, rows } = await roleuser.findAndCountAll({});
        if (count < 1)
            throw new Error('Objects not found, items ' + count);
        rows.map(img => async function () {
            await img.destroy({ force: true, truncate: true });
        });
        return count;
    }

    async deleteAllByUser(user: number) {
        var { count, rows } = await roleuser.findAndCountAll({ where: { user: user } });
        if (count < 1)
            throw new Error('Objects not found, items ' + count);
        rows.map(img => async function () {
            await img.destroy({ force: true, truncate: true });
        });
        return count;
    }

    async deleteAllByRole(role: number) {
        var { count, rows } = await roleuser.findAndCountAll({ where: { role: role } });
        if (count < 1)
            throw new Error('Objects not found, items ' + count);
        rows.map(img => async function () {
            await img.destroy({ force: true, truncate: true });
        });
        return count;
    }
}