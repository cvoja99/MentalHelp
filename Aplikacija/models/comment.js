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
    static associate({User,Post,CommentVotes}) {
      this.belongsTo(User,{foreignKey: `userId`, as:'user', onDelete: "CASCADE"});
      this.belongsTo(Post,{foreignKey:'postId', as:'post', onDelete: "CASCADE"});
      this.hasMany(CommentVotes,{foreignKey:'voteId',as:'commentVotes', onDelete: "CASCADE"});

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
    body: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
