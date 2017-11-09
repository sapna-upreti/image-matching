import { Router } from 'express';
import * as ImageController from './controllers/image.controller';
//require multer for the file uploads
const multer = require('multer');
// set the directory for the uploads to the uploaded to
const DIR = './uploads/';
const DIR1 = './images/';

//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
// const upload = multer({dest: DIR});
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR)
  },
  filename: function (req, file, cb) {
    console.log('file...............', file)
    console.log('req.diseases...............', req.diseases)
    
    cb(null, req.diseases._id + '-' + Date.now())
  }
})

var storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR1)
  }
})


var upload = multer({ storage: storage })
var upload1 = multer({ storage: storage1 })

var upload = multer({ dest: process.env.PWD+'/uploads',
filename: function (req, file, cb) {
  console.log('file...............', file)
  console.log('req.diseases...............', req.diseases)
  
  cb(null, req.diseases._id + '-' + Date.now())
} })
// import AuthValidate from './auth.validate';
// import AuthAccess from '../auth/auth.middleware';

const router = new Router();

router.route('/welcome').get(ImageController.welcome);
router.post('/photos/upload/:name', ImageController.create, upload.array('files'), ImageController.saveImage)

router.post('/photos/upload2/', upload1.single('files'),  ImageController.get)

// router.route('/photos/upload').post(ImageController.create, function uploadAudio(req, res) {
//   var storage = multer.diskStorage({
//       destination: DIR
//   });
//   var upload = multer({
//       storage: storage
//   }).any();

//   upload(req, res, function(err) {
//       if (err) {
//           console.log(err);
//           return res.end('Error');
//       } else {
//           console.log(req.body);
//           req.files.forEach(function(item) {
//               console.log(item);
//               // move your file to destination
//           });
//           res.end('File uploaded');
//       }
//   });
// });

// AuthRouter.route('/auth/logout').post(AuthAccess.cookie.anyone, AuthController.logout);
// AuthRouter.route('/auth/change-password').post(AuthAccess.cookie.logged, AuthController.changePassword);
// AuthRouter.route('/auth/verify-email/:token').get(AuthValidate.hasToken, AuthController.onVerifyEmailLink);

// AuthRouter.route('/auth/forgot-password').post(AuthController.forgotPassword);
// AuthRouter.route('/auth/forgot-password/:token').get(AuthValidate.hasToken, AuthController.onForgotPasswordLink);

// AuthRouter.route('/auth/reset-password').post(AuthController.resetPasswordByUser);
// AuthRouter.route('/auth/reset-password/:token').get(AuthValidate.hasToken, AuthController.onResetPasswordLink);

export default router;
