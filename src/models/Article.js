import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        url_image: {
            type: String,
            required: true
        },
        likes: {
            type: String,
            required: false
        },
        views: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Articles', articleSchema)