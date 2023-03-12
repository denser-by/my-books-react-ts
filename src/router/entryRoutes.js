const express = require('express');
const { Sequelize, DataTypes, Model } = require('sequelize');
const role = require('../../models/index').Role;

let sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/db.sqlite'
});

class RolesEntry {
    async auth() {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async getRolesCheck() {
        const roles = await role.findAll();
        console.log(roles.every(roleItem => roleItem instanceof role));
        let logRec = '';
        roles.map(roleItem => logRec += '' + (roleItem instanceof role) + ', ');
        console.log(logRec);
        console.log('allRoles=' + JSON.stringify(roles));
    }

    async getRoles() {
        const roles = await role.findAll();
        console.log('allRoles=' + JSON.stringify(roles));
        return roles;
    }

    async forceClose() {
        await sequelize.close();
    }

    async lunchStart() {
        let needsCreate = !true;
        await this.auth();
        await this.getRolesCheck();
    }
}

let rcc = new RolesEntry();
rcc.lunchStart();