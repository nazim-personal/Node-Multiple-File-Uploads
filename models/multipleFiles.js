const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const multipleFilesSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    files:[Object]

},{timestamps:true});

module.exports = mongoose.model('multipleFiles', multipleFilesSchema);