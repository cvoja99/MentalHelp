'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User,{foreignKey: `userId`, as:'user'});
    }
  }
  Post.init({
    title:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[0,10]
      }
    },
    body: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[0,1000]
      }
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[0,50]
      }
    },
    image: DataTypes.STRING,
    userId: 
    {
    type:DataTypes.INTEGER,
    allowNull: false
  }
  }, 
  {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};