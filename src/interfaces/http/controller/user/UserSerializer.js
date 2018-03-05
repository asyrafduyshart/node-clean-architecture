const UserSerializer = {
  serialize({ uid, authority, profile }) {
    return {
      uid,
      authority,
      profile
    };
  }
};
  
module.exports = UserSerializer;
  