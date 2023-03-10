console.log('Hello Sequelize');

const { Sequelize, DataTypes, Model } = require('sequelize');

let sequelize;
const dbPostrgreChoice = false;

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

const AuthorBook = sequelize.define("authorbook", {}, {
    modelName: 'authorbook',
    tableName: 'author_book',
    sequelize,
    timestamps: false,
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
Appointment.belongsTo(Image, {
    foreignKey: 'map'
});

(async () => {
    await sequelize.sync({ force: true });
    console.error('sync finished');

    let dp = new DataPack();
    await dp.prepareDataImages();
    // await dp.prepareStarterBooks();

    const book1 = await Book.create({ id: 1, name: 'Book1', info: 'Book Description 1', year: 1999, cover_img: 1001 });
    const book2 = await Book.create({ id: 2, name: 'Book2', info: 'Book Description 2', year: 1995, cover_img: 1002 });
    const book3 = await Book.create({ id: 3, name: 'Book3', info: 'Book Description 3', year: 2001, cover_img: 1003 });
    const book4 = await Book.create({ id: 4, name: 'Book4', info: 'Book Description 4', year: 2003, cover_img: 1004 });
    const book5 = await Book.create({ id: 5, name: 'Book5', info: 'Book Description 5', year: 2004, cover_img: 1005 });
    const book6 = await Book.create({ id: 6, name: 'Book6', info: 'Book Description 6', year: 2001, cover_img: 1006 });
    const book7 = await Book.create({ id: 7, name: 'Book7', info: 'Book Description 7', year: 2010, cover_img: 1007 });
    const book8 = await Book.create({ id: 8, name: 'Book8', info: 'Book Description 8', year: 1992, cover_img: 1008 });
    const book9 = await Book.create({ id: 9, name: 'Book9', info: 'Book Description 9', year: 1995, cover_img: 1009 });
    const book10 = await Book.create({ id: 10, name: 'Book10', info: 'Book Description 10', year: 2011, cover_img: 1010 });
    const book11 = await Book.create({ id: 11, name: 'Book11', info: 'Book Description 11', year: 1999, cover_img: 1011 });
    const book12 = await Book.create({ id: 12, name: 'Book12', info: 'Book Description 12', year: 1995, cover_img: 1012 });
    const book13 = await Book.create({ id: 13, name: 'Book13', info: 'Book Description 13', year: 1998, cover_img: 1016 });
    const book14 = await Book.create({ id: 14, name: 'Book14', info: 'Book Description 14', year: 1992, cover_img: 1017 });
    const book15 = await Book.create({ id: 15, name: 'Book15', info: 'Book Description 15', year: 2003, cover_img: 1018 });
    const book16 = await Book.create({ id: 16, name: 'Book16', info: 'Book Description 16', year: 2001, cover_img: 1019 });
    const book17 = await Book.create({ id: 17, name: 'Book17', info: 'Book Description 17', year: 2005, cover_img: 1020 });
    const book18 = await Book.create({ id: 18, name: 'Book18', info: 'Book Description 18', year: 2002, cover_img: 1021 });
    const book19 = await Book.create({ id: 19, name: 'Book19', info: 'Book Description 19', year: 2007, cover_img: 1022 });
    const book20 = await Book.create({ id: 20, name: 'Book20', info: 'Book Description 20', year: 1998, cover_img: 1023 });
    const book21 = await Book.create({ id: 21, name: 'Book21', info: 'Book Description 21', year: 1993, cover_img: 1001 });
    const book22 = await Book.create({ id: 22, name: 'Book22', info: 'Book Description 22', year: 2013, cover_img: 1002 });
    const book23 = await Book.create({ id: 23, name: 'Book23', info: 'Book Description 23', year: 1992, cover_img: 1003 });
    const book24 = await Book.create({ id: 24, name: 'Book24', info: 'Book Description 24', year: 1996, cover_img: 1004 });
    const book25 = await Book.create({ id: 25, name: 'Book25', info: 'Book Description 25', year: 1998, cover_img: 1005 });
    const book26 = await Book.create({ id: 26, name: 'Book26', info: 'Book Description 26', year: 1992, cover_img: 1006 });
    const book27 = await Book.create({ id: 27, name: 'Book27', info: 'Book Description 27', year: 2003, cover_img: 1007 });
    const book28 = await Book.create({ id: 28, name: 'Book28', info: 'Book Description 28', year: 2001, cover_img: 1008 });
    const book29 = await Book.create({ id: 29, name: 'Book29', info: 'Book Description 29', year: 2005, cover_img: 1009 });
    const book30 = await Book.create({ id: 30, name: 'Book30', info: 'Book Description 30', year: 2002, cover_img: 1010 });

    const author1 = await Author.create({ id: 1, name: 'Author1', info: 'Author Description 1', age: 1999, photo: 1013});
    await author1.addBook(book1, { through: { selfGranted: false } }); 
    await author1.addBook(book11, { through: { selfGranted: false } }); 
    await author1.addBook(book23, { through: { selfGranted: false } }); 
    const result = await Author.findOne({ where: { name: 'Author1' }, include: Book }); 
    console.log(result);

    const author2 = await Author.create({ id: 2, name: 'Author2', info: 'Author Description 2', age: 2000, photo: 1014 });
    await author2.addBook(book2, { through: { selfGranted: false } }); 
    await author2.addBook(book3, { through: { selfGranted: false } }); 
    const result2 = await Author.findOne({ where: { name: 'Author2' }, include: Book }); 
    console.log(result2);

    const author3 = await Author.create({ id: 3, name: 'Author3', info: 'Author Description 3', age: 2001, photo: 1015 });
    await author3.addBook(book4, { through: { selfGranted: false } }); 
    await author3.addBook(book5, { through: { selfGranted: false } }); 
    await author3.addBook(book6, { through: { selfGranted: false } }); 
    const result3 = await Author.findOne({ where: { name: 'Author3' }, include: Book }); 
    console.log(result3);

    const author4 = await Author.create({ id: 4, name: 'Author4', info: 'Author Description 4', age: 2002, photo: 1013 });
    await author4.addBook(book7, { through: { selfGranted: false } }); 
    await author4.addBook(book9, { through: { selfGranted: false } }); 
    const result4 = await Author.findOne({ where: { name: 'Author4' }, include: Book }); 
    console.log(result4);

    const author5 = await Author.create({ id: 5, name: 'Author5', info: 'Author Description 5', age: 2003, photo: 1014 });
    await author5.addBook(book10, { through: { selfGranted: false } }); 
    await author5.addBook(book15, { through: { selfGranted: false } }); 
    await author5.addBook(book19, { through: { selfGranted: false } }); 
    const result5 = await Author.findOne({ where: { name: 'Author5' }, include: Book }); 
    console.log(result5);

    const author6 = await Author.create({ id: 6, name: 'Author6', info: 'Author Description 6', age: 2004, photo: 1015 });
    await author6.addBook(book13, { through: { selfGranted: false } }); 
    await author6.addBook(book20, { through: { selfGranted: false } }); 
    const result6 = await Author.findOne({ where: { name: 'Author6' }, include: Book }); 
    console.log(result6);

    const author7 = await Author.create({ id: 7, name: 'Author7', info: 'Author Description 7', age: 2005, photo: 1013 });
    await author7.addBook(book23, { through: { selfGranted: false } }); 
    await author7.addBook(book15, { through: { selfGranted: false } }); 
    await author7.addBook(book19, { through: { selfGranted: false } }); 
    const result7 = await Author.findOne({ where: { name: 'Author7' }, include: Book }); 
    console.log(result7);

    const author8 = await Author.create({ id: 8, name: 'Author8', info: 'Author Description 8', age: 2006, photo: 1014 });
    await author8.addBook(book1, { through: { selfGranted: false } }); 
    await author8.addBook(book2, { through: { selfGranted: false } }); 
    const result8 = await Author.findOne({ where: { name: 'Author8' }, include: Book }); 
    console.log(result8);

    const author9 = await Author.create({ id: 9, name: 'Author9', info: 'Author Description 9', age: 2007, photo: 1015 });
    await author9.addBook(book3, { through: { selfGranted: false } }); 
    await author9.addBook(book4, { through: { selfGranted: false } }); 
    await author9.addBook(book5, { through: { selfGranted: false } }); 
    const result9 = await Author.findOne({ where: { name: 'Author9' }, include: Book }); 
    console.log(result9);

    const author10 = await Author.create({ id: 10, name: 'Author10', info: 'Author Description 10', age: 2005, photo: 1014 });
    await author10.addBook(book6, { through: { selfGranted: false } }); 
    await author10.addBook(book7, { through: { selfGranted: false } }); 
    const result10 = await Author.findOne({ where: { name: 'Author10' }, include: Book }); 
    console.log(result10);

    const author11 = await Author.create({ id: 11, name: 'Author11', info: 'Author Description 11', age: 2006, photo: 1013 });
    await author11.addBook(book8, { through: { selfGranted: false } }); 
    await author11.addBook(book9, { through: { selfGranted: false } }); 
    await author11.addBook(book10, { through: { selfGranted: false } }); 
    const result11 = await Author.findOne({ where: { name: 'Author11' }, include: Book }); 
    console.log(result11);

    const author12 = await Author.create({ id: 12, name: 'Author12', info: 'Author Description 12', age: 2007, photo: 1014 });
    await author12.addBook(book11, { through: { selfGranted: false } }); 
    await author12.addBook(book12, { through: { selfGranted: false } }); 
    const result12 = await Author.findOne({ where: { name: 'Author12' }, include: Book }); 
    console.log(result12);

    const author13 = await Author.create({ id: 13, name: 'Author13', info: 'Author Description 13', age: 2001, photo: 1015 });
    await author13.addBook(book13, { through: { selfGranted: false } }); 
    await author13.addBook(book14, { through: { selfGranted: false } }); 
    await author13.addBook(book15, { through: { selfGranted: false } }); 
    const result13 = await Author.findOne({ where: { name: 'Author13' }, include: Book }); 
    console.log(result13);

    const author14 = await Author.create({ id: 14, name: 'Author14', info: 'Author Description 14', age: 2002, photo: 1013 });
    await author14.addBook(book16, { through: { selfGranted: false } }); 
    await author14.addBook(book17, { through: { selfGranted: false } }); 
    const result14 = await Author.findOne({ where: { name: 'Author14' }, include: Book }); 
    console.log(result14);

    const author15 = await Author.create({ id: 15, name: 'Author15', info: 'Author Description 15', age: 2003, photo: 1014 });
    await author15.addBook(book18, { through: { selfGranted: false } }); 
    await author15.addBook(book19, { through: { selfGranted: false } }); 
    await author15.addBook(book20, { through: { selfGranted: false } }); 
    const result15 = await Author.findOne({ where: { name: 'Author15' }, include: Book }); 
    console.log(result15);

    const author16 = await Author.create({ id: 16, name: 'Author16', info: 'Author Description 16', age: 2004, photo: 1015 });
    await author16.addBook(book21, { through: { selfGranted: false } }); 
    await author16.addBook(book22, { through: { selfGranted: false } }); 
    const result16 = await Author.findOne({ where: { name: 'Author16' }, include: Book }); 
    console.log(result16);

    const author17 = await Author.create({ id: 17, name: 'Author17', info: 'Author Description 17', age: 2005, photo: 1013 });
    await author17.addBook(book23, { through: { selfGranted: false } }); 
    await author17.addBook(book24, { through: { selfGranted: false } }); 
    await author17.addBook(book25, { through: { selfGranted: false } }); 
    const result17 = await Author.findOne({ where: { name: 'Author17' }, include: Book }); 
    console.log(result17);

    const author18 = await Author.create({ id: 18, name: 'Author18', info: 'Author Description 18', age: 2006, photo: 1014 });
    await author18.addBook(book26, { through: { selfGranted: false } }); 
    await author18.addBook(book27, { through: { selfGranted: false } }); 
    const result18 = await Author.findOne({ where: { name: 'Author18' }, include: Book }); 
    console.log(result18);

    const author19 = await Author.create({ id: 19, name: 'Author19', info: 'Author Description 19', age: 2007, photo: 1015 });
    await author19.addBook(book28, { through: { selfGranted: false } }); 
    await author19.addBook(book29, { through: { selfGranted: false } }); 
    await author19.addBook(book30, { through: { selfGranted: false } }); 
    const result19 = await Author.findOne({ where: { name: 'Author19' }, include: Book }); 
    console.log(result19);

    const author20 = await Author.create({ id: 20, name: 'Author20', info: 'Author Description 20', age: 2004, photo: 1014 });
    await author20.addBook(book15, { through: { selfGranted: false } }); 
    await author20.addBook(book16, { through: { selfGranted: false } }); 
    const result20 = await Author.findOne({ where: { name: 'Author20' }, include: Book }); 
    console.log(result20);

    const author21 = await Author.create({ id: 21, name: 'Author21', info: 'Author Description 21', age: 1999, photo: 1013 });
    await author21.addBook(book17, { through: { selfGranted: false } }); 
    await author21.addBook(book18, { through: { selfGranted: false } }); 
    await author21.addBook(book19, { through: { selfGranted: false } }); 
    const result21 = await Author.findOne({ where: { name: 'Author21' }, include: Book }); 
    console.log(result21);
    
    const author22 = await Author.create({ id: 22, name: 'Author22', info: 'Author Description 22', age: 2000, photo: 1014 });
    await author22.addBook(book20, { through: { selfGranted: false } }); 
    await author22.addBook(book21, { through: { selfGranted: false } }); 
    const result22 = await Author.findOne({ where: { name: 'Author22' }, include: Book }); 
    console.log(result22);

    const author23 = await Author.create({ id: 23, name: 'Author23', info: 'Author Description 23', age: 2001, photo: 1015 });
    await author23.addBook(book22, { through: { selfGranted: false } }); 
    await author23.addBook(book23, { through: { selfGranted: false } }); 
    await author23.addBook(book24, { through: { selfGranted: false } }); 
    const result23 = await Author.findOne({ where: { name: 'Author23' }, include: Book }); 
    console.log(result23);

    const author24 = await Author.create({ id: 24, name: 'Author24', info: 'Author Description 24', age: 2002, photo: 1013 });
    await author24.addBook(book25, { through: { selfGranted: false } }); 
    await author24.addBook(book26, { through: { selfGranted: false } }); 
    const result24 = await Author.findOne({ where: { name: 'Author24' }, include: Book }); 
    console.log(result24);

    const author25 = await Author.create({ id: 25, name: 'Author25', info: 'Author Description 25', age: 2003, photo: 1014 });
    await author25.addBook(book27, { through: { selfGranted: false } }); 
    await author25.addBook(book28, { through: { selfGranted: false } }); 
    await author25.addBook(book29, { through: { selfGranted: false } }); 
    const result25 = await Author.findOne({ where: { name: 'Author25' }, include: Book }); 
    console.log(result25);

    const author26 = await Author.create({ id: 26, name: 'Author26', info: 'Author Description 26', age: 2004, photo: 1015 });
    await author26.addBook(book30, { through: { selfGranted: false } }); 
    await author26.addBook(book11, { through: { selfGranted: false } }); 
    const result26 = await Author.findOne({ where: { name: 'Author26' }, include: Book }); 
    console.log(result26);

    const author27 = await Author.create({ id: 27, name: 'Author27', info: 'Author Description 27', age: 2005, photo: 1013 });
    await author27.addBook(book12, { through: { selfGranted: false } }); 
    await author27.addBook(book13, { through: { selfGranted: false } }); 
    await author27.addBook(book14, { through: { selfGranted: false } }); 
    const result27 = await Author.findOne({ where: { name: 'Author27' }, include: Book }); 
    console.log(result27);

    const author28 = await Author.create({ id: 28, name: 'Author28', info: 'Author Description 28', age: 2006, photo: 1014 });
    await author28.addBook(book15, { through: { selfGranted: false } }); 
    await author28.addBook(book16, { through: { selfGranted: false } }); 
    const result28 = await Author.findOne({ where: { name: 'Author28' }, include: Book }); 
    console.log(result28);

    const author29 = await Author.create({ id: 29, name: 'Author29', info: 'Author Description 29', age: 2007, photo: 1015 });
    await author29.addBook(book17, { through: { selfGranted: false } }); 
    await author29.addBook(book18, { through: { selfGranted: false } }); 
    await author29.addBook(book19, { through: { selfGranted: false } }); 
    const result29 = await Author.findOne({ where: { name: 'Author29' }, include: Book }); 
    console.log(result29);

    const author30 = await Author.create({ id: 30, name: 'Author30', info: 'Author Description 30', age: 2003, photo: 1013 });
    await author30.addBook(book20, { through: { selfGranted: false } }); 
    await author30.addBook(book21, { through: { selfGranted: false } }); 
    const result30 = await Author.findOne({ where: { name: 'Author30' }, include: Book }); 
    console.log(result30);

    // const author31 = await Author.create({ id: 31, name: 'Author31', info: 'Author Description 31', age: 2007, photo: 1015 });
    // await author31.addBook(book41, { through: { selfGranted: false } }); 
    // await author31.addBook(book21, { through: { selfGranted: false } }); 
    // await author31.addBook(book1, { through: { selfGranted: false } }); 
    // const result_31 = await Author.findOne({ where: { name: 'Author31' }, include: Book }); 
    // console.log(result_31);

    const book31 = await Book.create({ id: 31, name: 'Book31', info: 'Book Description 31', year: 2007, cover_img: 1011 });
    await book31.addAuthor(author1, { through: { selfGranted: false } }); 
    await book31.addAuthor(author2, { through: { selfGranted: false } }); 
    await book31.addAuthor(author3, { through: { selfGranted: false } }); 
    const result31 = await Book.findOne({ where: { name: 'Book31' }, include: Author }); 
    console.log(result31);

    const book32 = await Book.create({ id: 32, name: 'Book32', info: 'Book Description 32', year: 1998, cover_img: 1012 });
    await book32.addAuthor(author4, { through: { selfGranted: false } }); 
    await book32.addAuthor(author5, { through: { selfGranted: false } }); 
    const result32 = await Book.findOne({ where: { name: 'Book32' }, include: Author }); 
    console.log(result32);

    const book33 = await Book.create({ id: 33, name: 'Book33', info: 'Book Description 33', year: 1993, cover_img: 1016 });
    await book33.addAuthor(author6, { through: { selfGranted: false } }); 
    await book33.addAuthor(author7, { through: { selfGranted: false } }); 
    await book33.addAuthor(author8, { through: { selfGranted: false } }); 
    const result33 = await Book.findOne({ where: { name: 'Book33' }, include: Author }); 
    console.log(result33);

    const book34 = await Book.create({ id: 34, name: 'Book34', info: 'Book Description 34', year: 2013, cover_img: 1017 });
    await book34.addAuthor(author9, { through: { selfGranted: false } }); 
    await book34.addAuthor(author10, { through: { selfGranted: false } }); 
    const result34 = await Book.findOne({ where: { name: 'Book34' }, include: Author }); 
    console.log(result34);

    const book35 = await Book.create({ id: 35, name: 'Book35', info: 'Book Description 35', year: 1992, cover_img: 1018 });
    await book35.addAuthor(author11, { through: { selfGranted: false } }); 
    await book35.addAuthor(author12, { through: { selfGranted: false } }); 
    await book35.addAuthor(author13, { through: { selfGranted: false } }); 
    const result35 = await Book.findOne({ where: { name: 'Book35' }, include: Author }); 
    console.log(result35);

    const book36 = await Book.create({ id: 36, name: 'Book36', info: 'Book Description 36', year: 1996, cover_img: 1019 });
    await book36.addAuthor(author14, { through: { selfGranted: false } }); 
    await book36.addAuthor(author15, { through: { selfGranted: false } }); 
    const result36 = await Book.findOne({ where: { name: 'Book36' }, include: Author }); 
    console.log(result36);

    const book37 = await Book.create({ id: 37, name: 'Book37', info: 'Book Description 37', year: 1996, cover_img: 1020 });
    await book37.addAuthor(author16, { through: { selfGranted: false } }); 
    await book37.addAuthor(author17, { through: { selfGranted: false } }); 
    await book37.addAuthor(author18, { through: { selfGranted: false } }); 
    const result37 = await Book.findOne({ where: { name: 'Book37' }, include: Author }); 
    console.log(result37);

    const book38 = await Book.create({ id: 38, name: 'Book38', info: 'Book Description 38', year: 1997, cover_img: 1021 });
    await book38.addAuthor(author19, { through: { selfGranted: false } }); 
    await book38.addAuthor(author20, { through: { selfGranted: false } }); 
    const result38 = await Book.findOne({ where: { name: 'Book38' }, include: Author }); 
    console.log(result38);

    const book39 = await Book.create({ id: 39, name: 'Book39', info: 'Book Description 39', year: 2003, cover_img: 1022 });
    await book39.addAuthor(author21, { through: { selfGranted: false } }); 
    await book39.addAuthor(author22, { through: { selfGranted: false } }); 
    await book39.addAuthor(author23, { through: { selfGranted: false } }); 
    const result39 = await Book.findOne({ where: { name: 'Book39' }, include: Author }); 
    console.log(result39);

    const book40 = await Book.create({ id: 40, name: 'Book40', info: 'Book Description 40', year: 2001, cover_img: 1023 });
    await book40.addAuthor(author24, { through: { selfGranted: false } }); 
    await book40.addAuthor(author25, { through: { selfGranted: false } }); 
    await book40.addAuthor(author26, { through: { selfGranted: false } }); 
    await book40.addAuthor(author27, { through: { selfGranted: false } }); 
    const result40 = await Book.findOne({ where: { name: 'Book40' }, include: Author }); 
    console.log(result40);

    const book41 = await Book.create({ id: 41, name: 'Book41', info: 'Book Description 41', year: 2003, cover_img: 1006 });
    await book41.addAuthor(author28, { through: { selfGranted: false } }); 
    await book41.addAuthor(author29, { through: { selfGranted: false } }); 
    await book41.addAuthor(author30, { through: { selfGranted: false } }); 
    const result41 = await Book.findOne({ where: { name: 'Book41' }, include: Author }); 
    console.log(result41);

    const author31 = await Author.create({ id: 31, name: 'Author31', info: 'Author Description 31', age: 2007, photo: 1015 });
    await author31.addBook(book41, { through: { selfGranted: false } }); 
    await author31.addBook(book21, { through: { selfGranted: false } }); 
    await author31.addBook(book1, { through: { selfGranted: false } }); 
    const result_31 = await Author.findOne({ where: { name: 'Author31' }, include: Book }); 
    console.log(result_31);

    console.log(result);
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

    getCleanDbSqReq() {
        return `
            drop table user_role;
            drop table users;
            drop table roles;
            drop table author_book;
            drop table books;
            drop table authors;
            drop table images;
            drop table cities;
            drop table appointments;
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
        const imageBook1 = await Image.create({ id: 1001, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/1.jpg', image_type: 'cover_img' });
        const imageBook2 = await Image.create({ id: 1002, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/2.jpg', image_type: 'cover_img' });
        const imageBook3 = await Image.create({ id: 1003, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/3.jpg', image_type: 'cover_img' });
        const imageBook4 = await Image.create({ id: 1004, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/4.jpg', image_type: 'cover_img' });
        const imageBook5 = await Image.create({ id: 1005, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/5.jpg', image_type: 'cover_img' });
        const imageBook6 = await Image.create({ id: 1006, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/6.jpg', image_type: 'cover_img' });
        const imageBook7 = await Image.create({ id: 1007, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/7.jpg', image_type: 'cover_img' });
        const imageBook8 = await Image.create({ id: 1008, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/8.jpg', image_type: 'cover_img' });
        const imageBook9 = await Image.create({ id: 1009, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/9.jpg', image_type: 'cover_img' });
        const imageBook10 = await Image.create({ id: 1010, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/10.jpg', image_type: 'cover_img' });
        const imageBook11 = await Image.create({ id: 1011, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/11.jpg', image_type: 'cover_img' });
        const imageBook12 = await Image.create({ id: 1012, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/12.jpg', image_type: 'cover_img' });
        const imageAuthor1 = await Image.create({ id: 1013, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/author1.gif', image_type: 'photo' });
        const imageAuthor2 = await Image.create({ id: 1014, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/author2.gif', image_type: 'photo' });
        const imageAuthor3 = await Image.create({ id: 1015, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/author3.gif', image_type: 'photo' });
        const imageBook13 = await Image.create({ id: 1016, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/13.jpg', image_type: 'cover_img' });
        const imageBook14 = await Image.create({ id: 1017, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/14.jpg', image_type: 'cover_img' });
        const imageBook15 = await Image.create({ id: 1018, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/15.jpg', image_type: 'cover_img' });
        const imageBook16 = await Image.create({ id: 1019, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/16.jpg', image_type: 'cover_img' });
        const imageBook17 = await Image.create({ id: 1020, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/17.jpg', image_type: 'cover_img' });
        const imageBook18 = await Image.create({ id: 1021, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/18.jpg', image_type: 'cover_img' });
        const imageBook19 = await Image.create({ id: 1022, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/19.jpg', image_type: 'cover_img' });
        const imageBook20 = await Image.create({ id: 1023, path: 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/20.jpg', image_type: 'cover_img' });
    }

    async prepareStarterBooks() {
    }
}

console.error('end');