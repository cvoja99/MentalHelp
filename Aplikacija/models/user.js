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
    static associate({Post,Comment}) {
      this.hasMany(Post,{foreignKey:'userId',as:'posts', onDelete: "CASCADE"});
      this.hasMany(Comment,{foreignKey:'commentId',as:'commentId', onDelete: "CASCADE"});
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
        notEmpty:true,
        notNull:true
      }
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true,
        notNull:true
      }
    },
    username:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        notEmpty:true,
        notNull:true
      }
     
    }
  },
  {
    sequelize,
    modelName: 'User',
  });
  return User;
};