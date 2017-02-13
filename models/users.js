var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var shortId = require('shortid');

//Database 連線位置
mongoose.connect('mongodb://localhost/ckhs-auth');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String },
    username: { type: String, require: true, unique: true },
    password: { type: String },
    email: { type: String },

    role: { type: String, default: '1' },

    _id: { type: String, default: shortId.generate },

    token: { type: String }

    created_at: { type: Date, default: Date.now }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
