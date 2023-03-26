import { Injectable } from '@nestjs/common';
import { CreateRoleUserDto } from './dto/CreateRoleUserDto';
import { DeleteRoleUserDto } from './dto/DeleteRoleUserDto';
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

    async size(): Promise<number> {
        return await roleuser.count();
    }

    async sizeByUser(user: number): Promise<number> {
        var { count, rows } = await roleuser.findAndCountAll({ where: { user: user } });
        return count >= 1 ? count : 0;
    }

    async sizeByRole(role: number): Promise<number> {
        var { count, rows } = await roleuser.findAndCountAll({ where: { role: role } });
        return count >= 1 ? count : 0;
    }

    async hasOne(user: number, role: number): Promise<boolean> {
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

    private async prepareDtoDelete(ref: any): Promise<DeleteRoleUserDto> {
        let result = new DeleteRoleUserDto();
        result.id = ref.id;
        result.user = ref.user;
        result.role = ref.role;
        return result;
    }

    async delete(id: number): Promise<DeleteRoleUserDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await roleuser.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        await rows[0].destroy({ force: true, truncate: true });
        let result = await this.prepareDtoDelete(rows[0]);
        return result;
    }

    async deleteByUserRole(user: number, role: number): Promise<DeleteRoleUserDto> {
        if (user == null || user == undefined || user < 0 || role == null || role == undefined || role < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await roleuser.findAndCountAll({ where: { user: user, role: role } });
        if (count != 1)
            throw new Error('Object not found, user=' + user + ' role=' + role);
        await rows[0].destroy({ force: true, truncate: true });
        let result = await this.prepareDtoDelete(rows[0]);
        return result;
    }

    async deleteAll(): Promise<DeleteRoleUserDto[]> {
        var { count, rows } = await roleuser.findAndCountAll({});
        if (count < 1)
            throw new Error('Objects not found, items ' + count);
        let result = [];
        for (let i = 0; i < rows.length; i++) {
            result.push(await this.prepareDtoDelete(rows[i]));
            await rows[i].destroy({ force: true, truncate: true });
        }
        return result;
    }

    async deleteAllByUser(user: number): Promise<DeleteRoleUserDto[]> {
        var { count, rows } = await roleuser.findAndCountAll({ where: { user: user } });
        let result = [];
        if (count > 0) {
            for (let i = 0; i < rows.length; i++) {
                result.push(await this.prepareDtoDelete(rows[i]));
                await rows[i].destroy({ force: true, truncate: true });
            }
        }
        return result;
    }

    async deleteAllByRole(role: number): Promise<DeleteRoleUserDto[]> {
        var { count, rows } = await roleuser.findAndCountAll({ where: { role: role } });
        let result = [];
        if (count > 0) {
            for (let i = 0; i < rows.length; i++) {
                result.push(await this.prepareDtoDelete(rows[i]));
                await rows[i].destroy({ force: true, truncate: true });
            }
        }
        return result;
    }
}