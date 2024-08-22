const multer = require("multer");
const path = require("path");
const ExpressError = require("../utils/ExpressError");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); //format nama file tersebut
    },
}); 

const upload = multer({ 
    storage: storage,

    fileFilter: function (req, file, cb) {
        //fungis untuk memeriksa atau validasi format gambar yang diupload
        if(file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new ExpressError('File harus berupa gambar', 405));
        }
    }
});

module.exports = upload