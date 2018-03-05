const User = require('src/domain/user/User');

const MongoUserMapper = {
  toEntity( dataValues ) {
    const { uid, authority, profile: {name, gender, location, website, picture } } = dataValues;
      
    return new User({ uid, authority, profile :{ name, gender, location, website, picture } });
  },
      
  toDatabase(survivor) {
    const { uid, authority, profile: {name, gender, location, website, picture } } = survivor;
      
    return { uid, authority, profile :{ name, gender, location, website, picture } };
  }
};

module.exports = MongoUserMapper;