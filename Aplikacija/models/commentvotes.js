'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentVotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Comment}) {
      this.belongsTo(User,{foreignKey: `userId`, as:'user', onDelete: "CASCADE"});
      this.belongsTo(Comment,{foreignKey:'commentId', as:'comment', onDelete: "CASCADE"});
    }
  }
  CommentVotes.init({
    commentId:{
      type:DataTypes.INTEGER,
      allowNull:false},
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false
    } 
  }, {
    sequelize,
    modelName: 'CommentVotes',
  });
  return CommentVotes;
};