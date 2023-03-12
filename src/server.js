const express = require('express');
const routerRole = require('./router/RouteRoles.js');
const routerUser = require('./router/RouteUsers.js');
const routerImage = require('./router/RouteImages.js');
const routerAuthor = require('./router/RouteAuthors.js');
const routerBook = require('./router/RouteBooks.js');
const app = express();

console.log('-------------------start-------------------------');

app.use(express.json());
app.use([routerRole, routerUser, routerImage, routerAuthor, routerBook]);

app.listen(3001, () => {
    console.log('-------------------server started----------------');
});

console.log('-------------------finish------------------------');