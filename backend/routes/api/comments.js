// imports
const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Schedule, Shift, User, Comment } = require('../../db/models');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op, Model, ValidationError, where } = require('sequelize');

const { formatNamedParameters } = require('sequelize/lib/utils');



// set up the express router
const router = express.Router();





router.get('/', async (req, res, next) => {
    try {
        let comments = await Comment.findAll({
           include:{model: User, attributes: ['id', 'firstName', 'lastName']},
            
            // The main order for the schedules by day
            order: [['id', 'desc']]
            
        });

        if (comments) {
            return res.json({
                Comments: comments
            })
        }

    } catch (error) {
        next(error)
    }
})

router.get('/:id/shifts', async (req, res, next) => {
    try {
        const { id } = req.params

        let shifts = await Shift.findAll({
            where: { 'scheduleId': id },
            include: {model: User, 
                as: 'User',
                attributes: ['id', 'firstName', 'lastName']
            }
        })
        if (shifts) {
            res.json({ Shifts: shifts })
        }

    } catch (error) {
        next(error)
    }
})

router.post('/', requireAuth,  async (req, res, next) => {
    try {
        console.log('backend')
        const { day } = req.body;
        console.log(day, 'day in backend')

        const newDay = await Schedule.create({
            day
        })


        console.log(newDay, 'jdfalk;')
        if (newDay) {
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