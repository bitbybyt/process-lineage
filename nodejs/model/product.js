const mongoose = require('mongoose');
const Company = require('./company');

const productSchema = new mongoose.Schema({
    name: String,
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    process: [
        {
            category: {
                type: String,
                lowercase: true,
                enum: ['decision', 'activity']
            },
            processName: String,
            state: {
                type: String,
                lowercase: true,
                enum: ['pending', 'fail', 'complete', 'active'],
                default: 'pending'
            },
            timeTaken: {
                type: Date,
                default: Date.now,
            }
        }
    ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 