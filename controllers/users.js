const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');

// @desc        Get all users
// @route       GET /api/v1/users
// @access      Public
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find()

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        })
    } catch (err) {
        next(err)
    }
}

// @desc        Get single user
// @route       GET /api/v1/users/:id
// @access      Public
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)

        // Because of the nature of the id comming from the database, sometimes if the ID is formatted the right way but the characters are wrong, it will send a http 200 response and the data objects is going to be equal to null. To prevent that behaviour, we are going to check with a conditional: if not bootcamp, then set the http response to 400
        if (!user) {
            return next(new ErrorResponse(`User not found with ID of ${req.params.id}`, 404))
        }

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (err) {
        // next(new ErrorResponse(`User not found with ID of ${req.params.id}`, 404))
        next(err)
    }
}

// @desc        Create user
// @route       POST /api/v1/users/
// @access      Private
exports.createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({
            success: true,
            data: user
        })
    } catch (err) {
        next(err)
    }
}

// @desc        Update user
// @route       PUT /api/v1/users/:id
// @access      Private
exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!user) {
            return next(new ErrorResponse(`User not found with ID of ${req.params.id}`, 404))
        }

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (err) {
        next(err)
    }
}

// @desc        Delete user
// @route       DELETE /api/v1/users/:id
// @access      Private
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            data: {}
        })

        if (!user) {
            return next(new ErrorResponse(`User not found with ID of ${req.params.id}`, 404))
        }
    } catch (err) {
        next(err)
    }
}