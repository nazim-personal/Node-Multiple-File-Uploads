
const multer = require('multer');
const path = require('path');
const { fileURLToPath } = require('url');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        // cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
        cb(null, file.originalname);
    }
});

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// @ts-ignore
const upload = multer({ storage: storage, filefilter: filefilter });
module.exports = {upload}