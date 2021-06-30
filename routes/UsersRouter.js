const express = require('express');
const router = express.Router();

const UsersController = require('../controllers').UserController;
const UserControllerObj = new UsersController();

var userImagePath = require('../config/config').userImageUploadPath;
/**
 * IMAGE UPLOAD STARTS
 */
const path = require('path');
const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, userImagePath)
  },
  filename: function (req, file, cb) {
    
    let id = req.params.id;
    let originalname = file.originalname;
    let newFileName = id;
    let extention = path.extname(originalname);
    let fullFileName = newFileName + extention;
    let fullFileNameWithPath = userImagePath +'/'+ fullFileName;
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
/**
 * IMAGE UPLOAD ENDS
 */

/**
 * USER ROUTING STARTS
 */
router.post('/changePic/:id', upload.single('profile_pic'), [
  UserControllerObj.changeProfilePic
]);

router.patch('/:id', [
  UserControllerObj.updateUser
]);

router.delete('/:id', [
  UserControllerObj.deleteUser
]);

router.get('/:id', [
  UserControllerObj.getUserById
]);

router.post('/', [
  UserControllerObj.insertUser
]);

router.get('/', [
  UserControllerObj.getAllUser
]);
/**
 * USER ROUTING ENDS
 */

module.exports = router;