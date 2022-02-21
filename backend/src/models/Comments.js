import mongoose from 'mongoose';

const repositorySchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
        product_id: {
            type: String,
            required: true
        },
        likes: {
            type: String,
            required: false
        },
        dislikes: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Comments', repositorySchema)