import Diseases from './../models/diseases';
import Images from './../models/image';
import * as ImageMatcher from './image.matcher';


// // import mongoose from 'mongoose';
// // const User = mongoose.model('User');

// import AuthToken from './auth.token';
// import AuthValidate from './auth.validate';
// import AuthErrors from './auth.errors';
// import Email from '../email/index';
// import { errorLogger, queryLogger, commonLogger } from '../../util/logger/errorLogger.js';

// import config from '../../config/main';

/**
 * Welcome
 * @param req
 * @param res
 * @returns void
 */
export function welcome(req, res) {
  return res.status(200).send('Welcome to your Tape!');
}

/**
 * Create data
 * @param req
 * @param res
 * @returns void
 */
export function create(req, res, next) {
  const data = req.params;
  console.log('body.....................', req.body)
  console.log('name.............', req.params)
  console.log('files.............', req.files)
  console.log('paramspa.............', req.params)
  
  console.log()
  const diseases = new Diseases({name: data.name, count: 0});
  diseases.save((err, res) => {
    console.log('res--------------->>>>>>>>>>>>>', res)
    console.log('err--------------->>>>>>>>>>>>>', err)
    
    if(res) {
      req.diseases = res._id;
      next();
    }
  });
  // return res.status(200).send('Welcome to your Tape!');
}

/**
 * Get data
 * @param req
 * @param res
 * @returns matched data
 */
export function get(req, res, next) {
  const data = req.filename;
  console.log(req.file)
  if(req.file) {
    ImageMatcher.imageMatcher(req.file.path, function(err, image) {
      console.log('err..................', err);
      console.log('res..................', image);
      if(image) {
        Diseases.findById(image._id, function(err, disease) {
          if (disease) {
            res.send(disease);
          } else {
            res.send('ok');
          }
        })
      } else {
        res.send('not found');
      }
      
    })
  }
  // return res.status(200).send('Welcome to your Tape!');
}

/**
 * Save Image
 * @param req
 * @param res
 * @returns void
 */
export function saveImage(req, res, next) {
  const data = req.params;
  let bulkInsert = Images.collection.initializeUnorderedBulkOp();
  let dataToInsert = [];
  if(req.files) {
    req.files.forEach(function(file) {
      bulkInsert.find({
        diseaseId: req.diseases, 
        count: 0, 
        path: file.path
      }).upsert().update({ $setOnInsert: { diseaseId: req.diseases, count: 0, path: file.path } });
    }, this);
  }
  bulkInsert.execute( function(err, res) {
   if(res) {
     console.log(res)
      req.diseases = res;
      next();
    } else {
      console.log(err);
    }
  });
  // return res.status(200).send('Welcome to your Tape!');
}