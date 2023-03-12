const appointment = require('../../models/index.js').Appointment;

class SvcAppointments {
    async create(appointmentCreate) {
        try {
            return await appointment.create({
                name: appointmentCreate.name,
                description: appointmentCreate.description,
                location: appointmentCreate.location,
                address: appointmentCreate.address,
                date: appointmentCreate.date,
                city: appointmentCreate.city,
                book: appointmentCreate.book,
                map: appointmentCreate.map
            });
        } catch (e) {
            throw new Error('Can not create Appointment, ' + e);
        }
    }

    async getAll() {
        var { count, rows } = await appointment.findAndCountAll({});
        if (count >= 1)
            return rows;
        return [];
    }

    async size() {
        return await appointment.count();
    }

    async hasOne(id) {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await appointment.findAndCountAll({ where: { id: id } });
        if (count == 1 && rows[0].id == id)
            return true;
        return false;
    }

    async findOneByName(name) {
        if (name != null && name != undefined && name.length > 0) {
            var { count, rows } = await appointment.findAndCountAll({ where: { name: name } });
            if (count > 0)
                return rows[0];
        }
        return null;
    }

    async getOne(id) {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await appointment.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        return rows[0];
    }

    async update(appointmentUpdate) {
        var id = appointmentUpdate.id;
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await appointment.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        rows[0].set({
            id: appointmentUpdate.id,
            name: appointmentUpdate.name,
            description: appointmentUpdate.description,
            location: appointmentUpdate.location,
            address: appointmentUpdate.address,
            date: appointmentUpdate.date,
            city: appointmentUpdate.city,
            book: appointmentUpdate.book,
            map: appointmentUpdate.map
        });
        rows[0].save();
        return rows[0];
    }

    async delete(id) {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await appointment.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        await rows[0].destroy({ force: true, truncate: true });
        return rows[0];
    }

    async deleteAll() {
        var { count, rows } = await appointment.findAndCountAll({});
        if (count < 1)
            throw new Error('Objects not found, items ' + count);
        rows.map(img => async function () {
            await img.destroy({ force: true, truncate: true });
        });
        return count;
    }
}

module.exports = new SvcAppointments()