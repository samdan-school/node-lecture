let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGOLAB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = {mongoose};