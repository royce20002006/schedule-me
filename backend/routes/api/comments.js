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
            include: { model: User, attributes: ['id', 'firstName', 'lastName'] },

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
            include: {
                model: User,
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

router.post('/', requireAuth, async (req, res, next) => {
    try {
        const { day } = req.body;

        const newDay = await Schedule.create({
            day
        })


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

router.put('/:id', requireAuth, async (req, res, next) => {
    try {
        const { id } = req.params;

        const { user } = req
        const { body } = req.body;



        if (user) {



            const comment = await Comment.findByPk(id);
            if (!comment) {
                const err = new Error('Comment not found');
                err.status = 404;
                throw err;
            }


            if (comment.userId === user.id) {

                comment.body = body

                await comment.save()

                const commentWithUser = await Comment.findOne({
                    where: { id: comment.id },
                    include: { model: User, attributes: ['id', 'firstName', 'lastName'] }
                });

                return res.json(commentWithUser);
            } else {
                const err = new Error('Forbidden')
                err.status = 403
                throw err
            }







        }



    } catch (error) {
        next(error)
    }
})


router.delete('/:id', requireAuth, async (req, res, next) => {
    try {
        const { user } = req;
        const { id } = req.params
        const comment = await Comment.findByPk(id);
        if (comment && user.id === comment.userId) {
            const deletedComment = await comment.destroy();
            return res.json(comment);
        }

    } catch (error) {
        next(error)
    }
})


module.exports = router;