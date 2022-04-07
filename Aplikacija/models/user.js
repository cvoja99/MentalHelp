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
    static associate({Post}) {
      // define association here
      this.hasMany(Post,{foreignKey:'userId',as:'posts'});
    }
  }
  User.init({
    tip: {
      type: DataTypes.ENUM('Korisnik', 'Strucno lice', 'Admin'),
      allowNull:false,
      defaultValue: "Korisnik"
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true,
      }
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    username:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    }
  },
  {
    sequelize,
    modelName: 'User',
  });
  return User;
};