
const express = require('express');
const {upload} = require('../helpers/fileHelper.js');
const {singleFileUpload, multipleFileUpload, getAllSingleFile, getAllMultipleFiles} = require('../controller/fileUploaderController.js');
const router = express.Router();

         router.post('/singleFile', upload.single('file'), singleFileUpload);
         router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
         router.get('/getSingleFile', getAllSingleFile);
         router.get('/getMultipleFile', getAllMultipleFiles);
module.exports = {
    routes:router
}