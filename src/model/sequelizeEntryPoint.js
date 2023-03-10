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
    // prepareData();

    let dp = new DataPack();

    await dp.prepareDataImages();
    console.error('sync Images finished');

    await dp.prepareDataBooks();
    console.error('sync Books finished');

    await dp.prepareDataAuthors();
    console.error('sync Authors finished');

})();

class DataPack {

    getCleanDbReq() {
        return `
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
            `;
    }

    getSelectAll() {
        return `
            select * from images;
            select * from books;
            select * from authors;
            `;
    }

    getFileSizeReq() {
        return "select size from pg_stat_file('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/20.jpg')";
    }

    async prepareDataImages() {
        console.log('prepare data images BEFORE');

        const imageBook1 = Image.create({ id: 1001, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/1.jpg', image_type: 'cover_img' });
        const imageBook2 = Image.create({ id: 1002, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/2.jpg', image_type: 'cover_img' });
        const imageBook3 = Image.create({ id: 1003, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/3.jpg', image_type: 'cover_img' });
        const imageBook4 = Image.create({ id: 1004, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/4.jpg', image_type: 'cover_img' });
        const imageBook5 = Image.create({ id: 1005, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/5.jpg', image_type: 'cover_img' });
        const imageBook6 = Image.create({ id: 1006, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/6.jpg', image_type: 'cover_img' });
        const imageBook7 = Image.create({ id: 1007, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/7.jpg', image_type: 'cover_img' });
        const imageBook8 = Image.create({ id: 1008, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/8.jpg', image_type: 'cover_img' });
        const imageBook9 = Image.create({ id: 1009, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/9.jpg', image_type: 'cover_img' });
        const imageBook10 = Image.create({ id: 1010, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/10.jpg', image_type: 'cover_img' });
        const imageBook11 = Image.create({ id: 1011, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/11.jpg', image_type: 'cover_img' });
        const imageBook12 = Image.create({ id: 1012, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/12.jpg', image_type: 'cover_img' });
        const imageBook13 = Image.create({ id: 1013, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/author1.gif', image_type: 'photo' });
        const imageBook14 = Image.create({ id: 1014, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/author2.gif', image_type: 'photo' });
        const imageBook15 = Image.create({ id: 1015, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/author3.gif', image_type: 'photo' });
        const imageBook16 = Image.create({ id: 1016, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/13.jpg', image_type: 'cover_img' });
        const imageBook17 = Image.create({ id: 1017, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/14.jpg', image_type: 'cover_img' });
        const imageBook18 = Image.create({ id: 1018, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/15.jpg', image_type: 'cover_img' });
        const imageBook19 = Image.create({ id: 1019, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/16.jpg', image_type: 'cover_img' });
        const imageBook20 = Image.create({ id: 1020, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/17.jpg', image_type: 'cover_img' });
        const imageBook21 = Image.create({ id: 1021, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/18.jpg', image_type: 'cover_img' });
        const imageBook22 = Image.create({ id: 1022, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/19.jpg', image_type: 'cover_img' });
        const imageBook23 = Image.create({ id: 1023, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/20.jpg', image_type: 'cover_img' });

        // console.log('prepare data images AFTER');
    }

    async prepareDataBooks() {
        console.log('prepare data books BEFORE');

        const book1 = Book.create({ id:1, name:'Book1', info:'Book Description 1', year:1999, cover_img:1001});
        const book2 = Book.create({ id:2, name:'Book2', info:'Book Description 2', year:1995, cover_img:1002});
        const book3 = Book.create({ id:3, name:'Book3', info:'Book Description 3', year:2001, cover_img:1003});
        const book4 = Book.create({ id:4, name:'Book4', info:'Book Description 4', year:2003, cover_img:1004});
        const book5 = Book.create({ id:5, name:'Book5', info:'Book Description 5', year:2004, cover_img:1005});
        const book6 = Book.create({ id:6, name:'Book6', info:'Book Description 6', year:2001, cover_img:1006});
        const book7 = Book.create({ id:7, name:'Book7', info:'Book Description 7', year:2010, cover_img:1007});
        const book8 = Book.create({ id:8, name:'Book8', info:'Book Description 8', year:1992, cover_img:1008});
        const book9 = Book.create({ id:9, name:'Book9', info:'Book Description 9', year:1995, cover_img:1009});
        const book10 = Book.create({ id:10, name:'Book10', info:'Book Description 10', year:2011, cover_img:1010});
        const book11 = Book.create({ id:11, name:'Book11', info:'Book Description 11', year:1999, cover_img:1011});
        const book12 = Book.create({ id:12, name:'Book12', info:'Book Description 12', year:1995, cover_img:1012});
        const book13 = Book.create({ id:13, name:'Book13', info:'Book Description 13', year:1998, cover_img:1016});
        const book14 = Book.create({ id:14, name:'Book14', info:'Book Description 14', year:1992, cover_img:1017});
        const book15 = Book.create({ id:15, name:'Book15', info:'Book Description 15', year:2003, cover_img:1018});
        const book16 = Book.create({ id:16, name:'Book16', info:'Book Description 16', year:2001, cover_img:1019});
        const book17 = Book.create({ id:17, name:'Book17', info:'Book Description 17', year:2005, cover_img:1020});
        const book18 = Book.create({ id:18, name:'Book18', info:'Book Description 18', year:2002, cover_img:1021});
        const book19 = Book.create({ id:19, name:'Book19', info:'Book Description 19', year:2007, cover_img:1022});
        const book20 = Book.create({ id:20, name:'Book20', info:'Book Description 20', year:1998, cover_img:1023});
        const book21 = Book.create({ id:21, name:'Book21', info:'Book Description 21', year:1993, cover_img:1001});
        const book22 = Book.create({ id:22, name:'Book22', info:'Book Description 22', year:2013, cover_img:1002});
        const book23 = Book.create({ id:23, name:'Book23', info:'Book Description 23', year:1992, cover_img:1003});
        const book24 = Book.create({ id:24, name:'Book24', info:'Book Description 24', year:1996, cover_img:1004});
        const book25 = Book.create({ id:25, name:'Book25', info:'Book Description 25', year:1998, cover_img:1005});
        const book26 = Book.create({ id:26, name:'Book26', info:'Book Description 26', year:1992, cover_img:1006});
        const book27 = Book.create({ id:27, name:'Book27', info:'Book Description 27', year:2003, cover_img:1007});
        const book28 = Book.create({ id:28, name:'Book28', info:'Book Description 28', year:2001, cover_img:1008});
        const book29 = Book.create({ id:29, name:'Book29', info:'Book Description 29', year:2005, cover_img:1009});
        const book30 = Book.create({ id:30, name:'Book30', info:'Book Description 30', year:2002, cover_img:1010});
        const book31 = Book.create({ id:31, name:'Book31', info:'Book Description 31', year:2007, cover_img:1011});
        const book32 = Book.create({ id:32, name:'Book32', info:'Book Description 32', year:1998, cover_img:1012});
        const book33 = Book.create({ id:33, name:'Book33', info:'Book Description 33', year:1993, cover_img:1016});
        const book34 = Book.create({ id:34, name:'Book34', info:'Book Description 34', year:2013, cover_img:1017});
        const book35 = Book.create({ id:35, name:'Book35', info:'Book Description 35', year:1992, cover_img:1018});
        const book36 = Book.create({ id:36, name:'Book36', info:'Book Description 36', year:1996, cover_img:1019});
        const book37 = Book.create({ id:37, name:'Book37', info:'Book Description 37', year:1996, cover_img:1020});
        const book38 = Book.create({ id:38, name:'Book38', info:'Book Description 38', year:1997, cover_img:1021});
        const book39 = Book.create({ id:39, name:'Book39', info:'Book Description 39', year:2003, cover_img:1022});
        const book40 = Book.create({ id:40, name:'Book40', info:'Book Description 40', year:2001, cover_img:1023});

        // console.log('prepare data books AFTER');
    }

    async prepareDataAuthors() {
        console.log('prepare data authors BEFORE');

        const author1 = Author.create({ id:1, name:'Author1', info:'Author Description 1', age:1999, photo:1013});
        const author2 = Author.create({ id:2, name:'Author2', info:'Author Description 2', age:2000, photo:1014});
        const author3 = Author.create({ id:3, name:'Author3', info:'Author Description 3', age:2001, photo:1015});
        const author4 = Author.create({ id:4, name:'Author4', info:'Author Description 4', age:2002, photo:1013});
        const author5 = Author.create({ id:5, name:'Author5', info:'Author Description 5', age:2003, photo:1014});
        const author6 = Author.create({ id:6, name:'Author6', info:'Author Description 6', age:2004, photo:1015});
        const author7 = Author.create({ id:7, name:'Author7', info:'Author Description 7', age:2005, photo:1013});
        const author8 = Author.create({ id:8, name:'Author8', info:'Author Description 8', age:2006, photo:1014});
        const author9 = Author.create({ id:9, name:'Author9', info:'Author Description 9', age:2007, photo:1015});
        const author10 = Author.create({ id:10, name:'Author10', info:'Author Description 10', age:2005, photo:1014});
        const author11 = Author.create({ id:11, name:'Author11', info:'Author Description 11', age:2006, photo:1013});
        const author12 = Author.create({ id:12, name:'Author12', info:'Author Description 12', age:2007, photo:1014});
        const author13 = Author.create({ id:13, name:'Author13', info:'Author Description 13', age:2001, photo:1015});
        const author14 = Author.create({ id:14, name:'Author14', info:'Author Description 14', age:2002, photo:1013});
        const author15 = Author.create({ id:15, name:'Author15', info:'Author Description 15', age:2003, photo:1014});
        const author16 = Author.create({ id:16, name:'Author16', info:'Author Description 16', age:2004, photo:1015});
        const author17 = Author.create({ id:17, name:'Author17', info:'Author Description 17', age:2005, photo:1013});
        const author18 = Author.create({ id:18, name:'Author18', info:'Author Description 18', age:2006, photo:1014});
        const author19 = Author.create({ id:19, name:'Author19', info:'Author Description 19', age:2007, photo:1015});
        const author20 = Author.create({ id:20, name:'Author20', info:'Author Description 20', age:2004, photo:1014});
        const author21 = Author.create({ id:21, name:'Author21', info:'Author Description 21', age:1999, photo:1013});
        const author22 = Author.create({ id:22, name:'Author22', info:'Author Description 22', age:2000, photo:1014});
        const author23 = Author.create({ id:23, name:'Author23', info:'Author Description 23', age:2001, photo:1015});
        const author24 = Author.create({ id:24, name:'Author24', info:'Author Description 24', age:2002, photo:1013});
        const author25 = Author.create({ id:25, name:'Author25', info:'Author Description 25', age:2003, photo:1014});
        const author26 = Author.create({ id:26, name:'Author26', info:'Author Description 26', age:2004, photo:1015});
        const author27 = Author.create({ id:27, name:'Author27', info:'Author Description 27', age:2005, photo:1013});
        const author28 = Author.create({ id:28, name:'Author28', info:'Author Description 28', age:2006, photo:1014});
        const author29 = Author.create({ id:29, name:'Author29', info:'Author Description 29', age:2007, photo:1015});
        const author30 = Author.create({ id:30, name:'Author30', info:'Author Description 30', age:2003, photo:1013});

        // console.log('prepare data authors AFTER');
    }

}

console.error('end');