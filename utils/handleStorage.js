const multer = require("multer");

const storage = multer.diskStorage({
    destination:function (req, file, cb) {
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage);
    },
    //Asignar nombre al archivo
    filename:function (req, file, cb) {
        const ext = file.originalname.split(".").pop();
        const filename = `file-${Date.now()}.${ext}`;
        cb(null, filename);
    },

});

const upLoadMiddleware = multer({storage});
module.exports = upLoadMiddleware;