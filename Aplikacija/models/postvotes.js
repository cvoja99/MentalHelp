'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostVotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Post}) {
      this.belongsTo(User,{foreignKey: `userId`, as:'user'});
      this.belongsTo(Post,{foreignKey:'postId', as:'post'});
    }
  }
  PostVotes.init({
    postId:{
     type: DataTypes.INTEGER,
     allowNull:false
    },
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false
    } 
  }, {
    sequelize,
    modelName: 'PostVotes',
  });
  return PostVotes;
};