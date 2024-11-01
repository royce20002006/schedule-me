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

const scheduleValidation = [
    check('day')
        .exists({ checkFalsy: true })

        .withMessage('Day has already been made'),
    handleValidationErrors
]



router.get('/', async (req, res, next) => {
    try {
        let schedules = await Schedule.findAll({
            include: [
                {
                    model: Shift,
                    as: 'Shifts',
                    attributes: ['id', 'startTime', 'endTime', 'userId'],
                    
                   
                    
                },
            ],
            // The main order for the schedules by day
            order: [['day', 'ASC'],
            [{ model: Shift, as: 'Shifts' }, 'startTime', 'ASC'] ]
        });

        if (schedules) {
            return res.json({
                Schedules: schedules
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
            },
            order: [['startTime', 'ASC']]
        })
        if (shifts) {
            res.json({ Shifts: shifts })
        }

    } catch (error) {
        next(error)
    }
})

router.post('/', requireAuth, scheduleValidation, async (req, res, next) => {
    try {
        const { day } = req.body;

        const newDay = await Schedule.create({
            day
        })


        
        if (newDay) {
            

            return res.json(newDay)
        } else {

            throw newDay
        }



    } catch (error) {
        next(error)
    }
})
router.post('/:id/shifts', requireAuth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { startTime, endTime, userId } = req.body;


        if (endTime <= startTime) {
            const err = new Error('Bad Request');
                    err.errors = { startTime: 'endTime cannot be on or before startTime' };
                    err.status = 400;
                    throw err;
        }

        const newShift = await Shift.create({
            startTime: startTime,
            endTime: endTime,
            scheduleId: parseInt(id),
            userId: parseInt(userId)

        }

        )
        const shiftWithUser = await Shift.findOne({
            where: { id: newShift.id },
            include: { model: User,as: 'User', attributes: ['id', 'firstName', 'lastName'] }
        });



        if (newShift) {
           

            return res.json(shiftWithUser)
        } else {

            throw newShift
        }



    } catch (error) {
        next(error)
    }
})

router.put('/:id/shifts/:shiftId', requireAuth, async (req, res, next) => {
    try {
        const { id, shiftId } = req.params;
        const { user } = req
        const { startTime, endTime, userId } = req.body;



        if (user) {

            if (endTime <= startTime) {
                const err = new Error('Bad Request');
                err.errors = { startTime: 'Start time cannot be on or after end time.' };
                err.status = 400
                return next(err)
            }

            const shift = await Shift.findByPk(shiftId);

            if (shift) {

                const updatedShift = await shift.update({
                    startTime: startTime,
                    endTime: endTime,
                    scheduleId: parseInt(id),
                    userId: userId

                })

                await shift.save()

                const shiftWithUser = await Shift.findOne({
                    where: { id: shift.id },
                    include: { model: User,as: 'User', attributes: ['id', 'firstName', 'lastName'] }
                });

                return res.json(shiftWithUser)
            }






        
        }



    } catch (error) {
        next(error)
    }
})

router.delete('/:id/shifts/:shiftId', requireAuth, async (req, res, next) => {
    try {
        const { user } = req;
        const { id, shiftId } = req.params
        const shift = await Shift.findByPk(shiftId);
        if (shift && user.role === 'Supervisor') {
            const deletedShift = await shift.destroy();
            return res.json(shift);
        }

    } catch (error) {
        next(error)
    }
})

//comments

router.post('/:id/shifts/:shiftId/comments', requireAuth, async (req, res, next) => {
    try {
        const { id, shiftId } = req.params;
        const {user} = req;
        const { body } = req.body;

        

        const newComment = await Comment.create({
            
           body,
            shiftId: parseInt(shiftId),
            userId: parseInt(user.id)

        }

        )



        if (newComment) {
            
            const commentWithUser = await Comment.findOne({
                where: { id: newComment.id },
                include: { model: User, attributes: ['id', 'firstName', 'lastName'] }
            });

            return res.json(commentWithUser);
        } else {

            throw newComment
        }



    } catch (error) {
        next(error)
    }
})

module.exports = router;