import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateSettingsDto } from './dto/CreateSettingsDto';
const settings = require('../../../models/index.js').Settings;

@Injectable()
export class SettingsService {

    constructor(
        private readonly userService: UserService
    ) { }

    async create(settingsCreate: CreateSettingsDto): Promise<CreateSettingsDto> {
        try {
            let createdSettings = await settings.create({
                userId: settingsCreate.userId,
                toasts: settingsCreate.toasts,
                lang: settingsCreate.lang,
                logout_timeout: settingsCreate.logout_timeout,
                table_page_size: settingsCreate.table_page_size,
            });
            return createdSettings;
        } catch (e) {
            throw new Error('Can not create Settings, ' + e);
        }
    }

    async size(): Promise<number> {
        return await settings.count();
    }

    async hasOne(id: number): Promise<boolean> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await settings.findAndCountAll({ where: { id: id } });
        if (count == 1 && rows[0].id == id)
            return true;
        return false;
    }

    private async prepareDtoFromEntity(bookRef: any): Promise<CreateSettingsDto> {
        let result = new CreateSettingsDto();
        result.id = bookRef.id;
        result.userId = bookRef.userId;
        result.toasts = bookRef.toasts;
        result.lang = bookRef.lang;
        result.logout_timeout = bookRef.logout_timeout;
        result.table_page_size = bookRef.table_page_size;
        return result;
    }

    async getOne(id: number): Promise<CreateSettingsDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await settings.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        return await this.prepareDtoFromEntity(rows[0]);
    }

    async getOneByUserId(userId: number) {
        if (userId != null && userId != undefined && userId >= 0) {
            var { count, rows } = await settings.findAndCountAll({ where: { userId: userId } });
            if (count > 0)
                return rows[0];
        }
        return null;
    }

    async getOneByLogin(login: string): Promise<CreateSettingsDto> {
        if (login != null && login != undefined && login.length > 0) {
            let user = await this.userService.findOneByLogin(login);
            if (user != null) {
                var { count, rows } = await settings.findAndCountAll({ where: { userId: user.id } });
                if (count > 0)
                    return await this.prepareDtoFromEntity(rows[0]);
            }
        }
        return null;
    }

    async update(settingsUpdate: CreateSettingsDto): Promise<CreateSettingsDto> {
        const id = settingsUpdate.id;
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await settings.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        rows[0].set({
            id: settingsUpdate.id,
            userId: settingsUpdate.userId,
            toasts: settingsUpdate.toasts,
            lang: settingsUpdate.lang,
            logout_timeout: settingsUpdate.logout_timeout,
            table_page_size: settingsUpdate.table_page_size,
        });
        await rows[0].save();
        return rows[0];
    }
}