const mongoose = require('mongoose');
const config = require('config');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 255,
        unique: true,
        validate: {
            validator: function() {
                return validator.isEmail(this.email);
            }
        }
    },
    sspID: {
        type: Number,
        required: true,
        unique: true,
        min: 1,
        max: 20000
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 1024
    },
    role: {
        type: String,
        required: true,
        enum: ['student', 'repre', 'ta', 'admin'],
        default: 'student'
    }
});

userSchema.statics.validateRegisteration = (user) => {
    const Schema = Joi.object({
        email: Joi.string().email().required(),
        sspID: Joi.number().integer().required().min(1).max(20000),
        password: Joi.string().required().min(6).max(50),
        confirmPassword: Joi.string().min(6).max(50)
    });

    return Schema.validate(user);
}

userSchema.statics.validateLogin = (user) => {
    const Schema = Joi.object({
        sspID: Joi.number().integer().required().min(1).max(20000),
        password: Joi.string().required().min(6).max(50)
    });

    return Schema.validate(user);
}

userSchema.methods.generateAuthToken = function() {
    const user = this;
    const secret = config.get('jwtPrivateKey');
    // TODO: CHANGE THE JWT PRIVATE KEY AND MAKE IT MORE SECURE
    const token = jwt.sign({ _id: user._id, role: user.role }, secret);
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;