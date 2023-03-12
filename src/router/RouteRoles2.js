// const express = require('express');
// const role = require('../../models/index').Role;
// const routerRole = express.Router();
// const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();

// routerRole.post('/roles', jsonParser, async (req, res) => {
//     try {
//         const { name, description } = req.body;
//         const roleItem = await role.create({ name, description });
//         res.json(roleItem);
//     } catch (e) {
//         res.status(500).json(e);
//     }
// });

// routerRole.get('/roles', (req, res) => {
//     role.findAll().then(fetchedDataItems => {
//         res.json(fetchedDataItems);
//     });
// });

// routerRole.get('/roles/:id', async (req, res) => {
//     let roleId = req.params.id;
//     if (!roleId)
//         throw new Error('ID not specified');
//     const { count, rows } = await role.findAndCountAll({ where: { id: roleId } });
//     if (count != 1)
//         res.json("Can not find Role with id=" + roleId);
//     else
//         res.json(rows[0]);
// });

// routerRole.put('/roles', jsonParser, async (req, res) => {
//     const { id, name, description } = req.body;
//     if (!id)
//         throw new Error('ID not specified');
//     const { count, rows } = await role.findAndCountAll({ where: { id: id } });
//     if (count != 1)
//         res.json("Can not find Role with id=" + id);
//     else {
//         rows[0].set({ name: name, description: description });
//         rows[0].save();
//         res.json(rows[0]);
//     }
// });

// routerRole.delete('/roles/:id', async (req, res) => {
//     let roleId = req.params.id;
//     if (!roleId)
//         throw new Error('ID not specified');
//     const { count, rows } = await role.findAndCountAll({ where: { id: roleId } });
//     if (count != 1)
//         res.json("Can not delete Role with id=" + roleId);
//     else {
//         await rows[0].destroy({ force: true });
//         res.json("Role with id=" + roleId + " has been deleted");
//     }
// });

// module.exports = routerRole