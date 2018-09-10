import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userModel = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      default: ''
    },
    fullName: {
      type: String
    },
    role: {
      type: Number,
      default: 1
    },
    provider: {
      type: String,
      default: 'Local'
    }
  },
  {
    timestamps: true
  }
);

/**
 * Password hash middleware.
 */
userModel.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(this.password, salt);

    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

/**
 * Helper method for validating user's password.
 */
userModel.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model('User', userModel);
