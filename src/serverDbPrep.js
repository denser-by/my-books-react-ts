console.log('Hello Sequelize');

const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../models/index');

let sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
});

console.log('Hello Sequelize' + sequelize);

class BooksDb {
    async auth() {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async createRoles() {
        console.log('prepare model');
        const role1 = await db.Role.create({ name: 'Role1', description: 'Description_1' });
        console.log(JSON.stringify(role1));        
        const role2 = await db.Role.create({ name: 'Role2', description: 'Description_2' });
        console.log(JSON.stringify(role2));        
        db.Role.sync();
        console.log('prepare model finish');
    }

    async getRoles() {
        const roles = await db.Role.findAll();
        console.log(roles.every(role => role instanceof db.Role));

        let logRec = '';
        roles.map(role => logRec+='' + (role instanceof db.Role) + ', ');
        console.log(logRec);
        console.log('allRoles='+JSON.stringify(roles));        
    }

    async forceClose() {
        await sequelize.close();
    }

    async lunchTest() {
        let needsCreate = !true;
        await this.auth();
        if(needsCreate)
            await this.createRoles();
        await this.getRoles();
    }
}

let booksDb = new BooksDb();
booksDb.lunchTest();

console.error('end');