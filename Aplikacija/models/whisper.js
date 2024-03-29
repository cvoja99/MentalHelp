'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Whisper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Whisper.init({
    userId: 
    {
    type:DataTypes.INTEGER,
    allowNull: false
  },
    targetuserId: 
    {
    type:DataTypes.INTEGER,
    allowNull: false
  },
    body: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Whisper',
  });
  return Whisper;
};