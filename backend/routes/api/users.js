const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

//backend validation for signup
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('firstName')
        .exists({checkFalsy: true})
        .isLength({min: 5})
        .withMessage('Please provide a first name with at least 5 characther'),
    check('lastName')
        .exists({checkFalsy: true})
        .isLength({min: 5})
        .withMessage('Please provide a last name with at least 5 characters.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'firstName', 'lastName', 'role'],
            order: [['lastName', 'ASC']]
        })
        if (users) {
            return res.json(users)
        }
    } catch (error) {
        next(error)
    }
})

// Sign up
router.post('/', validateSignup, async (req, res) => {
    try {
        const { email, password, username, firstName, lastName, role } = req.body;

        const emailCheck = await User.findOne({
            where: {
                email
            }
        })
        const usernameCheck = await User.findOne({
            where: {
                username
            }
        })

        if (emailCheck) {
            const err = new Error('User already exists');
            err.errors = { email: 'User with that email already exists' };
            err.status = 500
            return next(err)
        }

        if (usernameCheck) {
            const err = new Error('User already exists');
            err.errors = { username: 'User with that username already exists' };
            err.status = 500
            return next(err)
        }
    
        const hashedPassword = bcrypt.hashSync(password);
        const user = await User.create({ email, username, hashedPassword, firstName, lastName, role
         });
         

             const safeUser = {
                 id: user.id,
                 email: user.email,
                 username: user.username,
                 firstName: user.firstName,
                 lastName: user.lastName,
                 role: user.role
                 
             };
         
             await setTokenCookie(res, safeUser);
         
             return res.json({
                 user: safeUser
             });
         
        
    } catch (error) {
        next(error)
    }
});

// Restore session user
router.get('/', (req, res) => {
    const { user } = req;
    if (user) {
        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
        };
        return res.json({
            user: safeUser
        });
    } else return res.json({ user: null });
});

router.get('/all', async (req, res, next) => {
    try {
        
        const users = await User.findAll();
        
        if (users) {
            return res.json(users)
        } else {
            throw users
        }
        
    } catch (error) {
        next(error)
    }
})


module.exports = router;
