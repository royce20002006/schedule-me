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
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'cascade'})
      Comment.hasMany(models.Shift, {foreignKey: 'shiftId', onDelete:"cascade"})
    }
  }
  Comment.init({
    body: {
      type: DataTypes.STRING,
      allowNull: false

    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ShiftId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};