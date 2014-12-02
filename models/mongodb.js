var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Tutorial');
exports.mongoose = mongoose;