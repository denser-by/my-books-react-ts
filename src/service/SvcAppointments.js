const appointment = require('../../models/index.js').Appointment;

class SvcAppointments {
    async create(appointmentCreate) {
        try {
            const appointmentItem = await appointment.create({ 
                name: appointmentCreate.name,
                description: appointmentCreate.description,
                location: appointmentCreate.location,
                address: appointmentCreate.address,
                date: appointmentCreate.date,
                city: appointmentCreate.city,
                book: appointmentCreate.book,
                map: appointmentCreate.map
            });
            return appointmentItem;
        } catch (e) {
            throw new Error('Can not create Appointment, ' + e);
        }
    }

    async getAll() {
        const { count, rows } = await appointment.findAndCountAll({});
        console.log("Found Appointment " + count + " records");
        if (count >= 1)
            return rows;
        return [];
    }

    async getOne(id) {
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await appointment.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not find Appointment with id=" + id);
            return null;
        }
        return rows[0];
    }

    async update(appointmentUpdate) {
        const id = appointmentUpdate.id;
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await appointment.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not find Appointment with id=" + id);
            return null;
        }
        else {
            rows[0].set({ 
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
    }

    async delete(id) {
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await appointment.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not delete Appointment with id=" + id);
            return null;
        }
        await rows[0].destroy({ force: true });
        console.log("Appointment with id=" + id + " has been deleted");
        return rows[0];
    }
}

module.exports = new SvcAppointments()