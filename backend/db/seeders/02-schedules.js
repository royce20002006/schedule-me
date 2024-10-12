'use strict';

const {Schedule, Sequelize} = require('../models');



let options = {};
options.tableName = 'Schedules';

if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
      options.tableName = "Schedules";
      return queryInterface.bulkInsert(options, [
        {
          day: new Date('2024/09/20')
          
        },
        {
          day: new Date('2024/09/21')
          
        },
        {
          day: new Date('2024/09/22')
          
        },
        {
          day: new Date('2024/09/23')
          
        },
        {
          day: new Date('2024/09/24')
          
        },
        {
          day: new Date('2024/09/25')
          
        },
        {
          day: new Date('2024/09/26')
          
        },
        {
          day: new Date('2024/09/27')
          
        },
        {
          day: new Date('2024/09/28')
          
        },
        {
          day: new Date('2024/09/29')
          
        }
       
        
       
      ], {})
    },



    down: async (queryInterface, Sequelize) => {
      options.tableName = "Schedules";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, null, {
        
      })
    }
  }
