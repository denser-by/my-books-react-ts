'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    login: DataTypes.STRING,
    hash_password: DataTypes.STRING,
    favorite_color: DataTypes.STRING,
    avatar: DataTypes.INTEGER,
    from_city: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};