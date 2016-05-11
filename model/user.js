var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/database');

var Schema       = mongoose.Schema;

var UserSchema = new Schema ({
    userEmail : String,
    userPassword : String
});

module.exports = mongoose.model('User', UserSchema);