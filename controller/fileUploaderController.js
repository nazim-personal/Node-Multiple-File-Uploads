
const singleFile = require('../models/singlefile.js');
const multipleFiles = require('../models/multipleFiles.js');

const singleFileUpload = async(req,res,next)=>{
    try {
        const file  = new singleFile({
            fileName : req.file.originalname,
            filePath : req.file.path,
            fileType : req.file.mimetype,
            fileSize : fileSizeFormatter(req.file.size, 2)
        });
        await file.save();
        
        res.status(201).send('File uploaded Successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const multipleFileUpload = async(req, res, next) =>{

    try {
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                fileName : element.originalname,
                filePath : element.path,
                fileType : element.mimetype,
                fileSize : fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });

        const multipleFile = new multipleFiles({
            title:req.body.title,
            files:filesArray
        });
        await multipleFile.save();
        res.status(201).send("Multiple file upload successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const getAllSingleFile = async(req, res, next) =>{

    try {
        const files = await singleFile.find();
        res.status(201).send(files);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllMultipleFiles = async(req, res, next) =>{

    try {
        const files = await multipleFiles.find();
        
        res.status(201).send(files);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const fileSizeFormatter = (bytes, deceimal) =>{

    if(bytes == 0){
        return '0 Bytes';
    }
    const dm = deceimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes)/Math.log(1000));
    return parseFloat((bytes/Math.pow(1000, index)).toFixed(dm)) + '-' + sizes[index];
}
module.exports ={
    singleFileUpload,
    multipleFileUpload,
    getAllSingleFile,
    getAllMultipleFiles
}