const Model = require('../Models/Users');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require('jsonwebtoken');

const Users  = {}

// Login 
Users.login = async (req, res) => {
    try {
        await Model.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {                        
                return res.status(401).json({
                    message: 'Auth failed'
                })    
            }     
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err){
                    console.log(err)
                    return res.status(401).json({
                        message: 'Auth failed',                        
                    })                    
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    })
                }
                res.status(401).json({
                    message: 'Auth failed'
                })
            })
        })
    } catch (error) {                
        return res.status(500).json({
            error: err
        });
    }
}


// Signup
Users.post = async (req, res) => {
    try {
        Model.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
                })
            }else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new Model({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user
                        .save()
                        .then(result => {
                            console.log(result);
                            res.status(201).json({
                                Message: 'User Created'
                            });
                        })
                    }
                })                        
            }
        })
        
    } catch (error) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}

Users.delete = async (req, res) => {
    try {
        const id = req.params.userId
        await Model.remove({ _id:id })
        .exec()
        .then(result => {
            res.status(200).json({
                Message: 'User deleted'
            });
        })   
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: err
        });
    }    
}

module.exports = Users;