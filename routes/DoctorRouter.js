const express = require('express');
var path = require('path');
const router = express.Router();
const DoctorsController = require('../controllers').DoctorsController;
const DoctorsControllerObj = new DoctorsController();
let doctorsPath = 'public/images/uploads/doctors';

const multer = require('multer');
var storage = multer.diskStorage({   
    destination: function(req, file, cb) {
       cb(null, doctorsPath);
    }, 
    filename: function (req, file, cb) { 
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // console.log('file.originalname', uniqueSuffix +'_'+ file.originalname);
        // cb(null, file.fieldname + '-' + uniqueSuffix)
        
        let id = req.body.id;
        let originalname = file.originalname;
        let newFileName = id;
        let extention = path.extname(originalname);
        let fullFileName = newFileName + extention;
        let fullFileNameWithPath = doctorsPath +'/'+ fullFileName;
        
        req.params.imageDetails = {
            fileOriginalname : originalname,
            newFileName : newFileName,
            fileExtention : extention,
            fullFileName : fullFileName,
            fullFileNameWithPath : fullFileNameWithPath
        };
        cb(null , fullFileName );
    }
});
const upload = multer({
    storage: storage,
    limits : {fileSize : 1000000} // (1000000 bytes = 1MB)
});

router.get('/:id', DoctorsControllerObj.getById);
router.delete('/:id', DoctorsControllerObj.delete);
router.delete('/hard/:id', DoctorsControllerObj.deleteHard);
router.post('/profilepic', upload.single('profile_pic'), DoctorsControllerObj.uploadProfilePic);
router.patch('/', DoctorsControllerObj.update);
router.get('/', DoctorsControllerObj.getAll);
router.post('/', DoctorsControllerObj.insert);

module.exports = router;
