import mongoose from 'mongoose';

const menuModel = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    uri: {
      type: String,
      unique: true,
      required: true
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      default: undefined,
      ref: 'Menu'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Menu', menuModel);
