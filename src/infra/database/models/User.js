const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, unique: true },
  authority: { type: String, required: true },
  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  }
}, { timestamps: true });

/**
 * Statics
 */
userSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} uid - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  getByUid(uid) {
    return this.findOne({uid});
  },

  exist(uid) {
    return this.findOne({uid})
      .exec()
      .then((user)=>{
        if (user){
          return true;
        }

        return false;
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};


// Handler **must** take 3 parameters: the error that occurred, the document
// in question, and the `next()` function
userSchema.post('save', function (error, doc, next) {
  if (error.code === 11000) {
    const error = new Error('ValidationError');
    error.details = 'Duplicate found';
    next(error);
  } else {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);


module.exports = User;