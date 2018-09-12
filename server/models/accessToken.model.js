import mongoose from 'mongoose';
const accessTokenModel = mongoose.Schema(
  {
    _id: {
      // I'm not sure this is exceptable or replace with String
      type: mongoose.Schema.Types.ObjectId
    },
    ttl: {
      // Time to live
      type: Number
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('AccessToken', accessTokenModel);
