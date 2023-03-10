console.log('Hello Sequelize');

const { Sequelize, DataTypes, Model } = require('sequelize');

let sequelize;
const dbPostrgreChoice = !false;

if (dbPostrgreChoice) {
    sequelize = new Sequelize('my_books2', 'my_books_admin', 'root', {
        host: 'localhost',
        dialect: 'postgres', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
        dialectOptions: {
            application_name: 'my-books-react-ts',    // application in pg_stat_activity
            client_encoding: 'WIN1251',
            statement_timeout: '15000', //Times out queries after a set time in milliseconds
        }
    });
} else {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'db.sqlite3'
    });
}

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

    async forceClose() {
        await sequelize.close();
    }
}

let db = new BooksDb();
db.auth();

console.log('prepare model');

class Image extends Model { }
Image.init({
    path: DataTypes.STRING,
    mini_copy: DataTypes.BLOB('tiny'),
    image_type: DataTypes.ENUM('cover_img', 'photo', 'avatar', 'sightseen', 'map'),
    file_size: DataTypes.INTEGER
}, {
    modelName: 'image',
    tableName: 'images',
    sequelize,
});

class City extends Model { }
City.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    sightseen: DataTypes.INTEGER,
    location: DataTypes.STRING
}, {
    modelName: 'city',
    tableName: 'cities',
    sequelize,
});
City.belongsTo(Image, {
    foreignKey: 'sightseen'
});

const User = sequelize.define("user", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    hash_password: DataTypes.STRING,
    favoriteColor: {
        type: DataTypes.STRING,
        defaultValue: 'green'
    },
    avatar: DataTypes.INTEGER,
    fromCity: {
        type: DataTypes.STRING,
        defaultValue: 'Minsk'
    }
}, {
    modelName: 'user',
    tableName: 'users',
    sequelize,
});
User.belongsTo(Image, {
    foreignKey: 'avatar'
});

class Role extends Model { }
Role.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
}, {
    modelName: 'role',
    tableName: 'roles',
    sequelize,
});
User.belongsToMany(Role, { through: 'user_role', foreignKey: 'user' });
Role.belongsToMany(User, { through: 'user_role', foreignKey: 'role' });

class Book extends Model { }
Book.init({
    name: DataTypes.STRING,
    info: DataTypes.TEXT,
    year: DataTypes.INTEGER,
    cover_img: DataTypes.INTEGER
}, {
    modelName: 'book',
    tableName: 'books',
    sequelize,
});
Book.belongsTo(Image, {
    foreignKey: 'cover_img'
});

class Author extends Model { }
Author.init({
    name: DataTypes.STRING,
    info: DataTypes.TEXT,
    age: DataTypes.INTEGER,
    photo: DataTypes.INTEGER
}, {
    modelName: 'author',
    tableName: 'authors',
    sequelize,
});
Author.belongsTo(Image, {
    foreignKey: 'photo'
});

Book.belongsToMany(Author, { through: 'author_book', foreignKey: 'author' });
Author.belongsToMany(Book, { through: 'author_book', foreignKey: 'book' });

class Appointment extends Model { }
Appointment.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    location: DataTypes.STRING,
    address: DataTypes.STRING,
    date: DataTypes.DATE,
    city: DataTypes.INTEGER,
    book: DataTypes.INTEGER,
    map: DataTypes.INTEGER
}, {
    modelName: 'appointment',
    tableName: 'appointments',
    sequelize,
});
// Appointment.belongsTo(City, {
//     foreignKey: 'city'
// });
// Appointment.belongsTo(Book, {
//     foreignKey: 'book'
// });
Appointment.belongsTo(Image, {
    foreignKey: 'map'
});

(async () => {
    await sequelize.sync({ force: true });
    console.error('sync finished');
})();

/*
drop table users cascade;
drop table user_role cascade;
drop table roles cascade;
drop table books cascade;
drop table images cascade;
drop table authors cascade;
drop table author_book cascade;
drop table cities cascade;
drop table appointments cascade;
select * from pg_tables where tableowner = 'my_books_admin';
*/

console.error('end');