'use strict';
import { AllOperator } from '../../node_modules/sequelize/types/model.d';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.hasMany(models.Shift, {foreignKey: 'scheduleId', as: 'Schedule'})
    }
  }
  Schedule.init({
    day: DataTypes.DATE,
    allowNull: false,
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};