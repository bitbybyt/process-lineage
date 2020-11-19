const mongoose = require('mongoose');
const Company = require('./company');
const Bill = require('./bill');

const productSchema = new mongoose.Schema({
    name: String,
    status: {
        type: String,
        lowercase: true,
        enum: ['fail', 'complete', 'active'],
        default: 'active'
    },
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
            time: {
                inTime: {
                    type: Date,
                    default: Date.now,
                },
                outTime: {
                    type: Date,
                    default: Date.now,
                }
            }
        }
    ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 