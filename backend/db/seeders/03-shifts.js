'use strict';

const {Shift, Sequelize} = require('../models');



let options = {};
options.tableName = 'Shifts';

if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
      options.tableName = "Shifts";
      return queryInterface.bulkInsert(options, [
        {
          startTime: '06:00:00',
          endTime: '16:00:00',
          scheduleId: 1,
          userId: 2,
        },
        {
          startTime: '06:00:00',
          endTime: '14:00:00',
          scheduleId: 1,
          userId: 4,
        },
        {
          startTime: '13:00:00',
          endTime: '21:00:00',
          scheduleId: 1,
          userId: 5,
        },
        {
          startTime: '15:00:00',
          endTime: '00:00:00',
          scheduleId: 1,
          userId: 3,
        },
        {
          startTime: '17:00:00',
          endTime: '00:00:00',
          scheduleId: 1,
          userId: 6,
        },
        {
          startTime: '06:00:00',
          endTime: '16:00:00',
          scheduleId: 2,
          userId: 2,
        },
        {
          startTime: '06:00:00',
          endTime: '14:00:00',
          scheduleId: 2,
          userId: 4,
        },
        {
          startTime: '13:00:00',
          endTime: '21:00:00',
          scheduleId: 2,
          userId: 5,
        },
        {
          startTime: '15:00:00',
          endTime: '00:00:00',
          scheduleId: 2,
          userId: 3,
        },
        {
          startTime: '17:00:00',
          endTime: '00:00:00',
          scheduleId: 2,
          userId: 6,
        },
        {
          startTime: '06:00:00',
          endTime: '16:00:00',
          scheduleId: 3,
          userId: 3,
        },
        {
          startTime: '06:00:00',
          endTime: '14:00:00',
          scheduleId: 3,
          userId: 5,
        },
        {
          startTime: '13:00:00',
          endTime: '21:00:00',
          scheduleId: 3,
          userId: 8,
        },
        {
          startTime: '15:00:00',
          endTime: '00:00:00',
          scheduleId: 3,
          userId: 2,
        },
        {
          startTime: '17:00:00',
          endTime: '00:00:00',
          scheduleId: 3,
          userId: 7,
        },
        {
          startTime: '06:00:00',
          endTime: '16:00:00',
          scheduleId: 4,
          userId: 3,
        },
        {
          startTime: '06:00:00',
          endTime: '14:00:00',
          scheduleId: 4,
          userId: 5,
        },
        {
          startTime: '13:00:00',
          endTime: '21:00:00',
          scheduleId: 4,
          userId: 8,
        },
        {
          startTime: '15:00:00',
          endTime: '00:00:00',
          scheduleId: 4,
          userId: 2,
        },
        {
          startTime: '17:00:00',
          endTime: '00:00:00',
          scheduleId: 4,
          userId: 7,
        },
        {
          startTime: '06:00:00',
          endTime: '16:00:00',
          scheduleId: 5,
          userId: 3,
        },
        {
          startTime: '06:00:00',
          endTime: '14:00:00',
          scheduleId: 5,
          userId: 5,
        },
        {
          startTime: '13:00:00',
          endTime: '21:00:00',
          scheduleId: 5,
          userId: 8,
        },
        {
          startTime: '15:00:00',
          endTime: '00:00:00',
          scheduleId: 5,
          userId: 2,
        },
        {
          startTime: '17:00:00',
          endTime: '00:00:00',
          scheduleId: 5,
          userId: 7,
        },
        {
          startTime: '06:00:00',
          endTime: '16:00:00',
          scheduleId: 6,
          userId: 1,
        },
        {
          startTime: '06:00:00',
          endTime: '14:00:00',
          scheduleId: 6,
          userId: 4,
        },
        {
          startTime: '13:00:00',
          endTime: '21:00:00',
          scheduleId: 6,
          userId: 6,
        },
        {
          startTime: '15:00:00',
          endTime: '00:00:00',
          scheduleId: 6,
          userId: 3,
        },
        {
          startTime: '17:00:00',
          endTime: '00:00:00',
          scheduleId: 6,
          userId: 7,
        },
        {
          startTime: '06:00:00',
          endTime: '16:00:00',
          scheduleId: 7,
          userId: 1,
        },
        {
          startTime: '06:00:00',
          endTime: '14:00:00',
          scheduleId: 7,
          userId: 4,
        },
        {
          startTime: '13:00:00',
          endTime: '21:00:00',
          scheduleId: 7,
          userId: 6,
        },
        {
          startTime: '15:00:00',
          endTime: '00:00:00',
          scheduleId: 7,
          userId: 3,
        },
        {
          startTime: '17:00:00',
          endTime: '00:00:00',
          scheduleId: 7,
          userId: 7,
        },
        {
          startTime: '06:00:00',
          endTime: '16:00:00',
          scheduleId: 8,
          userId: 1,
        },
        {
          startTime: '06:00:00',
          endTime: '14:00:00',
          scheduleId: 8,
          userId: 4,
        },
        {
          startTime: '13:00:00',
          endTime: '21:00:00',
          scheduleId: 8,
          userId: 6,
        },
        {
          startTime: '15:00:00',
          endTime: '00:00:00',
          scheduleId: 8,
          userId: 3,
        },
        {
          startTime: '17:00:00',
          endTime: '00:00:00',
          scheduleId: 8,
          userId: 7,
        },
        {
          startTime: '06:00:00',
          endTime: '16:00:00',
          scheduleId: 9,
          userId: 3,
        },
        {
          startTime: '06:00:00',
          endTime: '14:00:00',
          scheduleId: 9,
          userId: 8,
        },
        {
          startTime: '13:00:00',
          endTime: '21:00:00',
          scheduleId: 9,
          userId: 6,
        },
        {
          startTime: '15:00:00',
          endTime: '00:00:00',
          scheduleId: 9,
          userId: 1,
        },
        {
          startTime: '17:00:00',
          endTime: '00:00:00',
          scheduleId: 9,
          userId: 5,
        },
        {
          startTime: '06:00:00',
          endTime: '16:00:00',
          scheduleId: 10,
          userId: 3,
        },
        {
          startTime: '06:00:00',
          endTime: '14:00:00',
          scheduleId: 10,
          userId: 8,
        },
        {
          startTime: '13:00:00',
          endTime: '21:00:00',
          scheduleId: 10,
          userId: 6,
        },
        {
          startTime: '15:00:00',
          endTime: '00:00:00',
          scheduleId: 10,
          userId: 1,
        },
        {
          startTime: '17:00:00',
          endTime: '00:00:00',
          scheduleId: 10,
          userId: 5,
        },
        
      ], {})
    },



    down: async (queryInterface, Sequelize) => {
      options.tableName = "Shifts";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, null, {
        
      })
    }
  }
