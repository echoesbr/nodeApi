var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema = new Schema ({
    userEmail : String,
    userPassword : String
});

module.exports = mongoose.model('users', UserSchema);