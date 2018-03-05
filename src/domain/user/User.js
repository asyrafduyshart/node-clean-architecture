const { attributes } = require('structure');

const Profile = attributes({
  name: {
    type: String,
    required: true
  },
  gender: String,
  location: String,
  website: String,
  picture: String,
})(class Profile {
  //   isLegal() {
  //     return this.age >= User.MIN_LEGAL_AGE;
  //   }
});
    

const User = attributes({
  uid: {
    type: String,
    required: true
  },
  authority: {
    type: String,
    required: true
  },
  profile: Profile,
})(class User {
//   isLegal() {
//     return this.age >= User.MIN_LEGAL_AGE;
//   }
});

User.MIN_LEGAL_AGE = 21;

module.exports = User;
