var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let STATUSES = ['OPEN', 'CLOSE', 'DELETED'];
let ROLES = ['ADMIN', 'SUB_ADMIN', 'CUSTOMER'];
let dated = new Date();

var UserSchema = new Schema({
	first_name: { type: String },
	last_name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    contact_number: { type: String, unique: true },
    profilePic: { type: String, default: null },
    role: { type: String, enum: ROLES },
    status: { type: String, enum: STATUSES },
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: dated },
    updatedAt: { type: Date, default: dated },
});

module.exports = mongoose.model('User', UserSchema);