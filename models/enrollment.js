const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const enrollmentSchema = new mongoose.Schema({
    _studentId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _courseId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

enrollmentSchema.statics.validate = (body) => {

    const schema = Joi.object({
        _courseId: Joi.objectId().required()
    });

    return schema.validate(body);
};

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;