const express = require('express');
var path = require('path');
const router = express.Router();
const PatientsController = require('../controllers').PatientsController;
const PatientsControllerObj = new PatientsController();
let patientsPath = 'public/images/uploads/patients';

const multer = require('multer');
var storage = multer.diskStorage({   
    destination: function(req, file, cb) {
       cb(null, patientsPath);
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
        let fullFileNameWithPath = patientsPath +'/'+ fullFileName;
        
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

router.get('/:id', PatientsControllerObj.getById);
router.delete('/:id', PatientsControllerObj.delete);
router.delete('/hard/:id', PatientsControllerObj.deleteHard);
router.post('/profilepic', upload.single('profile_pic'), PatientsControllerObj.uploadProfilePic);
router.patch('/', PatientsControllerObj.update);
router.get('/', PatientsControllerObj.getAll);
router.post('/', PatientsControllerObj.insert);

module.exports = router;
