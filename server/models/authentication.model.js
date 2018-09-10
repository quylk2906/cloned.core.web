import mongoose from 'mongoose';
const authenticationModel = mongoose.Schema(
  {
    clientID: {
      type: String
    },
    clientSecret: {
      type: String
    },
    callbackURL: {
      type: String
    },
    profileFields: [{ type: String }],
    passReqToCallback: {
      type: Boolean
    },
    consumerKey: {
      type: String
    },
    consumerSecret: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Authentication', authenticationModel);
