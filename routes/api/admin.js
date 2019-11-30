const express = require("express");
const bearerToken = require('express-bearer-token');
const router = express.Router();
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
router.use(bearerToken())

// Load User model
const User = require("../../models/User");

router.post("/getAllUsers", (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, authorizedData) => {
        if (err || (authorizedData.userType != 'SUPERADMIN')) {
            res.json({
                success: false,
                message: 'Not Authorized',
                users: []
            });
        } else {
            User.find({ userType: { $ne: 'SUPERADMIN' } })
                .then(users => {
                    res.json({
                        success: true,
                        users
                    });
                })
                .catch(err => {
                    res.json({
                        success: false,
                        message: err,
                        users: []
                    });
                })
        }
    })
});

router.post("/updateUserRole", (req, res) => {
    const role = req.body.role
    const users = req.body.users

    jwt.verify(req.token, keys.secretOrKey, (err, authorizedData) => {
        if (err || (authorizedData.userType != 'SUPERADMIN')) {
            res.json({
                success: false,
                message: 'Not Authorized',
                users: []
            });
        } else {
            User.updateMany(
                { _id: { $in: users } },
                { $set: { userType: role } }
            )
                .then(success => {
                    res.json({
                        success: true
                    });
                })
                .catch(err => {
                    res.json({
                        success: false
                    });
                })
        }
    })
});

module.exports = router;
