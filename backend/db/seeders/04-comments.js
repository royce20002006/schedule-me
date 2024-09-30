'use strict';

const {Comment, Sequelize} = require('../models');



let options = {};
options.tableName = 'Comments';

if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
      options.tableName = "Shifts";
      return queryInterface.bulkInsert(options, [
        {
          body: 'I really need off at 13:00 because i have a doctors appointment',
          userId: 2,
          shiftId: 1
        },
        {
          body: 'If you can get Gavin to come in early I am fine with that. ',
          userId: 1,
          shiftId: 1
        },
        {
          body: 'I really cannot work this day. I asked off in advaced can i switch with somebody? ',
          userId: 4,
          shiftId: 2
        },
        {
          body: 'I really cannot work this day. I asked off in advaced can i switch with somebody? ',
          userId: 4,
          shiftId: 7
        },
        {
          body: 'I will be late this day due to a school function',
          userId: 8,
          shiftId: 13
        },
        {
          body: 'How late?',
          userId: 1,
          shiftId: 13
        },
        {
          body: 'around a hour',
          userId: 8,
          shiftId: 13
        },
        {
          body: 'okay. let the manager know.',
          userId: 1,
          shiftId: 13
        },
        
        
      ], {})
    },



    down: async (queryInterface, Sequelize) => {
      options.tableName = "Comments";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, null, {
        
      })
    }
  }
