// Definition of the domain collection

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**Diseases schema
*/
const DiseasesSchema = new Schema({
  count: {
    type: String,
    required: true,
    default: 0
  },
  name: {
    type: String,
    required: true
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, { collection: 'Diseases' });

const Diseases = mongoose.model('Diseases', DiseasesSchema);

export default Diseases;
