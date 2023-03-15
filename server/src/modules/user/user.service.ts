import { Injectable } from '@nestjs/common';
import { ImageService } from '../image/image.service';
import { CreateUserDto } from './dto/CreateUserDto';
const user = require('../../../models/index.js').User;

@Injectable()
export class UserService {

    constructor(private readonly imageService: ImageService) { }

    async create(userCreate: CreateUserDto): Promise<CreateUserDto> {
        try {
            return await user.create({
                first_name: userCreate.first_name,
                last_name: userCreate.last_name,
                email: userCreate.email,
                phone: userCreate.phone,
                login: userCreate.login,
                hash_password: userCreate.hash_password,
                favorite_color: userCreate.favorite_color,
                avatar: userCreate.avatar,
                from_city: userCreate.from_city
            });
        } catch (e) {
            throw new Error('Can not create User, ' + e);
        }
    }

    async getAll() {
        var { count, rows } = await user.findAndCountAll({});
        if (count >= 1)
            return rows;
        return [];
    }

    async size() {
        return await user.count();
    }

    async hasOne(id: number) {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await user.findAndCountAll({ where: { id: id } });
        if (count == 1 && rows[0].id == id)
            return true;
        return false;
    }

    async findOneByLogin(login: string) {
        if (login != null && login != undefined && login.length > 0) {
            var { count, rows } = await user.findAndCountAll({ where: { login: login } });
            if (count > 0)
                return rows[0];
        }
        return null;
    }

    async getOne(id: number): Promise<CreateUserDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await user.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        return rows[0];
    }

    async update(userUpdate: CreateUserDto): Promise<CreateUserDto> {
        var id = userUpdate.id;
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await user.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        rows[0].set({
            id: userUpdate.id,
            first_name: userUpdate.first_name,
            last_name: userUpdate.last_name,
            email: userUpdate.email,
            phone: userUpdate.phone,
            login: userUpdate.login,
            hash_password: userUpdate.hash_password,
            favorite_color: userUpdate.favorite_color,
            avatar: userUpdate.avatar,
            from_city: userUpdate.from_city
        });
        rows[0].save();
        return rows[0];
    }

    async delete(id: number): Promise<CreateUserDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await user.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        await rows[0].destroy({ force: true, truncate: true });
        return rows[0];
    }

    async deleteAll() {
        var { count, rows } = await user.findAndCountAll({});
        if (count < 1)
            throw new Error('Objects not found, items ' + count);
        rows.map(img => async function () {
            await img.destroy({ force: true, truncate: true });
        });
        return count;
    }
}