const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a post title'],
            trim: true,
            maxlength: [50, 'Name can not be more than 50 characters']
        },
        slug: String,
        description: {
            type: String,
            required: [true, 'Please add a description'],
            maxlength: [1000, 'Description can not be more than 1000 characters']
        },
        comments: {
            type: [Object],
            required: false
        },
        postedBy: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

module.exports = mongoose.model('Post', PostSchema);