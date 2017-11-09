// Definition of the image collection

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**Images schema
*/
const ImagesSchema = new Schema({
  diseaseId: {
    type: String,
    required: true,
    default: 0
  },
  path: {
    type: String,
    required: true
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, { collection: 'Images' });

const Images = mongoose.model('Images', ImagesSchema);

export default Images;
