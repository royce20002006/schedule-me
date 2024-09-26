'use strict';
import BelongsTo from '../../node_modules/sequelize/types/associations/belongs-to.d';
const {
  Model,
  ForeignKeyConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shift.BelongsTo(models.Schedule, {ForeignKey: 'scheduleId', as: 'Schedule'})
      Shift.hasMany(models.User, {foreignKey: 'userId', as: 'User'})
      Shift.hasMany(models.Comment, {ForeignKey: 'shiftId'})
    }
  }
  Shift.init({
    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,

    },
    scheduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Shift',
  });
  return Shift;
};