'use strict';

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
      Shift.belongsTo(models.Schedule, {foreignKey: 'scheduleId', as: 'Schedule'})
      Shift.belongsTo(models.User, {foreignKey: 'userId', as: 'User'})
      Shift.hasMany(models.Comment, {foreignKey: 'shiftId', as: 'comments'})
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    
    }
  }, {
    sequelize,
    modelName: 'Shift',
  });
  return Shift;
};