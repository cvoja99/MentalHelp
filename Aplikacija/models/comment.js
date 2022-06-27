'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
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
  Comment.init({
    userId:{
    type: DataTypes.INTEGER,
    allowNull:false,
    },
    postId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    votes: DataTypes.INTEGER,
    body: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};