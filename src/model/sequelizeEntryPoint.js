console.log('Hello Sequelize');

const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('my_books2', 'my_books_admin', 'root', {
    host: 'localhost',
    dialect: 'postgres', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    dialectOptions: {
        application_name: 'my-books-react-ts',    // application in pg_stat_activity
        client_encoding: 'WIN1251',
        statement_timeout: '15000', //Times out queries after a set time in milliseconds

    }
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

    async forceClose() {
        await sequelize.close();
    }
}

let db = new BooksDb();
db.auth();


console.log('prepare model');

const User = sequelize.define("user", {
    name: DataTypes.TEXT,
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    favoriteColor: {
        type: DataTypes.TEXT,
        defaultValue: 'green'
    },
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER
}, {
    modelName: 'user',
    tableName: 'users',
    sequelize,
  });


  class MyModel extends Model {}
MyModel.init({
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id'
  }
}, { 
    modelName: 'mymodel',
    tableName: 'mymodels',
    sequelize,
 });


 class Collection extends Model {}
Collection.init({
  uid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
  }
}, { 
    modelName: 'collection',
    tableName: 'collections',
    sequelize,

 });

class Document extends Model { }
Document.init({
    author: DataTypes.STRING
}, { 
    modelName: 'document',
    tableName: 'documents',
    sequelize,
});

class Version extends Model { }
Version.init({
    timestamp: DataTypes.DATE
}, { 
    modelName: 'version',
    tableName: 'versions',
    sequelize,
});

Document.hasMany(Version); // This adds documentId attribute to version
Document.belongsTo(Version, {
    as: 'Current',
    foreignKey: 'currentVersionId'
}); // This adds currentVersionId attribute to document




class Trainer extends Model { }
Trainer.init({
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING
}, { 
    modelName: 'trainer',
    tableName: 'trainers',
    sequelize,
});

// Series will have a trainerId = Trainer.id foreign reference key
// after we call Trainer.hasMany(series)
class Series extends Model { }
Series.init({
    title: Sequelize.STRING,
    subTitle: Sequelize.STRING,
    description: Sequelize.TEXT,
    // Set FK relationship (hasMany) with `Trainer`
    trainerId: {
        type: DataTypes.INTEGER,
        references: {
            model: Trainer,
            key: 'id'
        }
    }
}, { 
    modelName: 'series',
    tableName: 'serieses',
    sequelize,
});

// Video will have seriesId = Series.id foreign reference key
// after we call Series.hasOne(Video)
class Video extends Model { }
Video.init({
    title: Sequelize.STRING,
    sequence: Sequelize.INTEGER,
    description: Sequelize.TEXT,
    // set relationship (hasOne) with `Series`
    seriesId: {
        type: DataTypes.INTEGER,
        references: {
            model: Series, // Can be both a string representing the table name or a Sequelize model
            key: 'id'
        }
    }
}, { 
    modelName: 'video',
    tableName: 'videos',
    sequelize,
});

Series.hasOne(Video);
Trainer.hasMany(Series);



class Organization extends Model { }
Organization.init({
    name: DataTypes.STRING
}, { 
    modelName: 'organization',
    tableName: 'organizations',
    sequelize,
});




class Project extends Model { }
Project.init({
    name: DataTypes.STRING
}, { 
    modelName: 'project',
    tableName: 'projects',
    sequelize,
});

class Task extends Model { }
Task.init({
    name: DataTypes.STRING
}, { 
    modelName: 'task',
    tableName: 'tasks',
    sequelize,
});



class Role extends Model { }
Role.init({
    name: DataTypes.STRING
}, { 
    modelName: 'role',
    tableName: 'roles',
    sequelize,
});



// 1:1
Organization.belongsTo(User, { foreignKey: 'owner_id' });
User.hasOne(Organization, { foreignKey: 'owner_id' });

// 1:M
Project.hasMany(Task, { foreignKey: 'tasks_pk' });
Task.belongsTo(Project, { foreignKey: 'tasks_pk' });

// N:M
User.belongsToMany(Role, { through: 'user_has_roles', foreignKey: 'user_role_user_id' });
Role.belongsToMany(User, { through: 'user_has_roles', foreignKey: 'roles_identifier' });


(async () => {
    await sequelize.sync({ force: true });
    console.error('sync finished');
})();


// const jane = User.build({ name: "Jane" });
// console.log(jane instanceof User); // true
// console.log(jane.name); // "Jane"


// (async () => {
//     await jane.save();
//     console.log('Jane was saved to the database!');
// })();


// (async () => {
//     const jane = await User.create({ name: "Jane" });
//     // Jane exists in the database now!
//     console.log(jane instanceof User); // true
//     console.log(jane.name); // "Jane"
// })();


console.error('end');