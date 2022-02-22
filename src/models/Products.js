import mongoose from 'mongoose';

const repositorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        details: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        Tags: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        url_image: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        totalSales: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Products', repositorySchema)