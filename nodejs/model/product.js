const mongoose = require('mongoose');
const Company = require('./company');
const Bill = require('./bill');

const productSchema = new mongoose.Schema({
	name: String,
	status: {
		type: String,
		lowercase: true,
		enum: ['fail', 'complete', 'active'],
		default: 'active',
	},
	totalTime: Number,
	parent: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Company',
	},
	process: [
		{
			category: {
				type: String,
				lowercase: true,
				enum: ['decision', 'activity'],
			},
			processName: String,
			state: {
				type: String,
				lowercase: true,
				enum: ['pending', 'fail', 'complete', 'active'],
				default: 'pending',
			},
			time: {
				inTime: {
					type: Date,
					default: Date.now,
				},
				outTime: {
					type: Date,
					default: Date.now,
				},
			},
		},
	],
});

productSchema.methods.eachTime = function (i) {
    let ret = [];
    for(let a=0;a<i;a++) {
        ret.push(this.process[a].time.outTime - this.process[a].time.inTime);
    }
    return ret;
};

productSchema.statics.alleachTime = async function (name, i) {
	// console.log(name);
	// console.log(i);
	let sum = 0;
    let cnt = 0;
    let ret = [];
	
	const foundProduct = await this.find({ name: name });

    for ( let a=0;a<i; a++) {
        cnt=0;
        sum=0;
        for (let p in foundProduct) {
            let foundProcess = foundProduct[p].process[a];
            if(foundProcess.state === 'complete') { 
                cnt += 1;
                sum += foundProcess.time.outTime - foundProcess.time.inTime;  
            } 
        }
        if(cnt===0) {ret.push(0);}
        else {ret.push(sum/cnt);}
    }   
	return ret;
};

productSchema.methods.tillTime = function (i) {
	if (this.process[i].state === 'complete') {
		return this.process[i].time.outTime - this.process[0].time.inTime;
	} else if (i > 0) {
		return this.process[i - 1].time.outTime - this.process[0].time.inTime;
	} else return 0;
};

productSchema.statics.alltillTime = async function (name, i) {
	let sum = 0;
	let cnt = 0;
	const foundProduct = await this.find({ name: name });

	for (let p in foundProduct) {
		let foundProcess = foundProduct[p].process[i];
		if (foundProcess.state === 'complete') {
			sum += foundProcess.time.outTime - foundProduct[p].process[0].time.inTime;
			cnt += 1;
		}
	}
	return sum / cnt;
};

productSchema.methods.propagationTime = function () {
    const len= this.process.length
    let max = 0;
	let t;
	let locdown = 0;
    for (i=1;i<len;i++) {
        if (this.process[i].state === 'complete' || this.process[i].state === 'active') {
            t = this.process[i].time.inTime - this.process[i - 1].time.outTime;
            if (t > max) {
                max = t;
                locdown = i-1;
            }
        } else break;
    }
	return [max, locdown];
};

productSchema.pre('save', async function () {
	if (this.status === 'complete') {
		let p = this.process.length;
		this.totalTime =
			this.process[p - 1].time.outTime - this.process[0].time.inTime;
	}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
