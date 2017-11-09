
var cv = require('opencv');
import Images from './../models/image';
import each from 'async/each';

/**
 * Image similarity
 * @param filepath, path of the file to match
 * @param matchFilepath, file path to be matched with
 * @param cb, callback function to be called
 * @returns Number, Dissimilarity
 */
export function imageSimilarity(filepath, matchFilepath, cb) {
  if (cv.ImageSimilarity === undefined) {
    console.log('TODO: Please port Features2d.cc to OpenCV 3')
    process.exit(0);
  }
  console.log('filepath: ', filepath)
  console.log('matchFilepath: ', matchFilepath)
  cv.readImage(filepath, function(err, car1) {
    if (err) throw err;
  
    cv.readImage(matchFilepath, function(err, car2) {
      if (err) throw err;
  
      console.log('........................', car1)
      console.log('+++++++++++++++++++++++++++', car2)
      
      cv.ImageSimilarity(car1, car2, function (err, dissimilarity) {
        if (err) throw err;
        cb(null, 100 - Number(dissimilarity));
        console.log('Similarity: ', 100 - Number(dissimilarity));
      });
  
    });
  
  });
}

/**
 * Image matcher
 * @param filepath, path of the file to match
 * @param cb, callback function to be called
 * @returns callback
 */
export function imageMatcher(filepath, cb) {
  Images.find({}, function (err, res) {
    let min = { _id: null, value: 50 };
    let i = 0;
    if(res) {
      console.log(res)
      each(res, function(image, callback) {
        console.log(i)
        let path = image.path;
        imageSimilarity(filepath, path, function(err, result) {
          if(result >= 50) {
            console.log('here Similarity : ', result)
            console.log('here min: : ', image)
          }
          if(result >= min.value) {
            min = { _id: image.diseaseId, value: result };
          }
          i++;
          console.log(i)
          console.log(res.length)
          if(i >= res.length) {
            console.log('min', min)
            if (min._id && min.value >= 50) {
              cb(null, min);
            } else {
              cb();
            }
          }
        })
      });

    } else {
      cb(new Error('image-processing', 'An error occured while processing your request', null));
    }
  })
}