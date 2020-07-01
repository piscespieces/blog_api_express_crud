// const ErrorResponse = require('../utils/ErrorResponse');
const Post = require('../models/Post');

// @desc        Get all posts
// @route       GET /api/v1/posts
// @access      Public
exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()

        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        })
    } catch (err) {
        next(err)
    }
}

// @desc        Get single post
// @route       GET /api/v1/posts/:id
// @access      Public
exports.getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)

        // Because of the nature of the id comming from the database, sometimes if the ID is formatted the right way but the characters are wrong, it will send a http 200 response and the data objects is going to be equal to null. To prevent that behaviour, we are going to check with a conditional: if not bootcamp, then set the http response to 400
        if (!post) {
            return next(new ErrorResponse(`Post not found with ID of ${req.params.id}`, 404))
        }

        res.status(200).json({
            success: true,
            data: post
        })
    } catch (err) {
        // next(new ErrorResponse(`Post not found with ID of ${req.params.id}`, 404))
        next(err)
    }
}

// @desc        Create post
// @route       POST /api/v1/posts/
// @access      Private
exports.createPost = async (req, res, next) => {
    try {
        const post = await Post.create(req.body)
        res.status(201).json({
            success: true,
            data: post
        })
    } catch (err) {
        next(err)
    }
}

// @desc        Create post comments
// @route       POST /api/v1/posts/id
// @access      Private
exports.createCommentPost = async (req, res, next) => {
    try {
        const filter = { _id: req.params.id };
        const update = { $addToSet: { comments: req.body } }

        const post = await Post.findOneAndUpdate(
            filter,
            update,
            { new: true }
        )

        if (!post) {
            return next(new ErrorResponse(`Post not found with ID of ${req.params.id}`, 404))
        }

        res.status(201).json({
            success: true,
            data: post
        })
    } catch (err) {
        next(err)
    }
}

// @desc        Update post
// @route       PUT /api/v1/posts/:id
// @access      Private
exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!post) {
            return next(new ErrorResponse(`Post not found with ID of ${req.params.id}`, 404))
        }

        res.status(200).json({
            success: true,
            data: post
        })
    } catch (err) {
        next(err)
    }
}

// @desc        Delete post
// @route       DELETE /api/v1/posts/:id
// @access      Private
exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            data: {}
        })

        if (!post) {
            return next(new ErrorResponse(`Post not found with ID of ${req.params.id}`, 404))
        }
    } catch (err) {
        next(err)
    }
}