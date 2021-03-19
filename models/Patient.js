var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let STATUSES = ['OPEN', 'CLOSE', 'DELETED'];
let dated = new Date();

var PatientSchema = new Schema({
	name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    age: { type: Number },
    mobile: { type: String },
    address: { type: String },
    profilePic: { type: String, default: null },
    status: { type: String, enum: STATUSES },
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: dated },
    updatedAt: { type: Date, default: dated },
});

module.exports = mongoose.model('Patient', PatientSchema);