// imports
const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Schedule, Shift } = require('../../db/models');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op, Model, ValidationError } = require('sequelize');

const { formatNamedParameters } = require('sequelize/lib/utils');



// set up the express router
const router = express.Router();

const scheduleValidation = [
    check('day')
        .exists({checkFalsy: true})
        
        .withMessage('Day has already been made'),
    handleValidationErrors
]

router.get('/', async (req, res, next) => {
    try {
        let schedules = await Schedule.findAll({
            include:[{model: Shift,
                as: 'Shifts',
                attributes: ['id', 'startTime', 'endTime', 'userId']
            }],
        
            order: [['day', 'ASC']]
        })

        if (schedules) {
            return res.json({
                Schedules: schedules
            })
        }
        
    } catch (error) {
        next(error)
    }
})

router.post('/', requireAuth, scheduleValidation, async (req, res, next) => {
    try {
        console.log('backend')
        const { day } = req.body;
       console.log(day, 'day in backend')

        const newDay = await Schedule.create({
            day
        })

        
        console.log(newDay, 'jdfalk;')
        if(newDay) {
            let scheduleFormatting = {
                id: newDay.id,
                day: newDay.day
            }
            
            return res.json(scheduleFormatting)
        } else {
            
            throw newDay
        }


        
    } catch (error) {
        next(error)
    }
})

module.exports = router;