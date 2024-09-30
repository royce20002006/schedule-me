'use strict';

const {User, Sequelize} = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Users';

if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
      options.tableName = "Users";
      return queryInterface.bulkInsert(options, [
        {
          firstName: 'Jeremy',
          lastName: 'Smitt',
          email: 'demo@user.io',
          role: 'Supervisor',
          username: 'Demo-lition',
          hashedPassword: bcrypt.hashSync('password'),
          
        },
        {
          firstName: 'John',
          lastName: 'Jerome',
          role: 'Manager',
          email: 'user1@user.io',
          username: 'FakeUser1',
          hashedPassword: bcrypt.hashSync('password2'),
          
        },
        {
          firstName: 'Gavin',
          lastName: 'Smith',
          role: 'Manager',
          email: 'user2@user.io',
          username: 'FakeUser2',
          hashedPassword: bcrypt.hashSync('password3'),
          
        },
        {
          firstName: 'Kelly',
          lastName: 'Mcbride',
          role: 'Employee',
          email: 'user3@user.io',
          username: 'FakeUser3',
          hashedPassword: bcrypt.hashSync('password4'),
          
        },
        {
          firstName: 'Catniss',
          lastName: 'Brown',
          role: 'Employee',
          email: 'user4@user.io',
          username: 'FakeUser4',
          hashedPassword: bcrypt.hashSync('password5'),
          
        },
        {
          firstName: 'Shelby',
          lastName: 'Watpick',
          role: 'Employee',
          email: 'user5@user.io',
          username: 'FakeUser5',
          hashedPassword: bcrypt.hashSync('password6'),
          
        },
        {
          firstName: 'Shawn',
          lastName: 'Williams',
          role: 'Employee',
          email: 'user6@user.io',
          username: 'FakeUser6',
          hashedPassword: bcrypt.hashSync('password7'),
          
        },
        {
          firstName: 'George',
          lastName: 'Anders',
          role: 'Employee',
          email: 'user7@user.io',
          username: 'FakeUser7',
          hashedPassword: bcrypt.hashSync('password8'),
          
        }
      ], {})
    },



    down: async (queryInterface, Sequelize) => {
      options.tableName = "Users";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
        username: {[Op.in]: []}
      })
    }
  }
