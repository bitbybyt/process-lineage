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
    totalTime: Number,
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

productSchema.methods.eachTime = function (i) {
    // console.log(i);
    // console.log(i);
    return (this.process[i].time.outTime - this.process[i].time.inTime);
}

productSchema.methods.tillTime = function (i) {
    if(this.process[i].state === 'complete') {
        return (this.process[i].time.outTime - this.process[0].time.inTime);
    } else if(i > 0) {
        return (this.process[i-1].time.outTime - this.process[0].time.inTime);
    } else return 0;
}

productSchema.pre('save', async function () {
    if(this.status === 'complete') {
        let p=this.process.length;
        this.totalTime = this.process[p-1].time.outTime - this.process[0].time.inTime
    }
    
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 