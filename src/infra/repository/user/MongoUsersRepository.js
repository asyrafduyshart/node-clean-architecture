const UserMapper = require('./MongoUserMapper');


class MongoUserRepository {

  constructor({UserModel}){
    this.UserModel = UserModel;
  }

  async getAll(){
    const users = await this.UserModel.list();
    return users.map(UserMapper.toEntity);
  }

  // RULES IN AS ENTITY --- OUT AS ENTITY
  async add(user){
    // Validate and check user existance throw error if any
    await this._validate(user);
    await this._checkExistance(user);

    //1. Before save to database conver data from entity structure to database structure using same folder mapper
    const User = new this.UserModel(UserMapper.toDatabase(user));
    const newUser = await User.save();

    // 2 After getting the newly saved date from database convert the result back as enitity
    return UserMapper.toEntity(newUser);

  }

  async update(user){
    // Validate user throw error if any
    await this._validate(user);
    const updateUser = await this._getUserByUid(user);
    const {name, gender, location, website, picture } = user.profile;
    updateUser.profile = {name, gender, location, website, picture };
    const updatedUser = await updateUser.save();
    return UserMapper.toEntity(updatedUser);
  }

  async remove(uid){
    const deleteUser = await this._getUserByUid({uid});
    if (!deleteUser){
      const error = new Error('ValidationError');
      error.details = { message: 'User not exist'};
      throw error;
    }
    const deletedUser = await deleteUser.remove();
    return UserMapper.toEntity(deletedUser);
  }

  async getUserByUid(uid){
    const dataUser = await this._getUserByUid({uid});
    if (!dataUser){
      const error = new Error('ValidationError');
      error.details = { message: 'User not exist'};
      throw error;
    }

    return UserMapper.toEntity(dataUser);
  }

  //Private functions
  async _getUserByUid({uid}){
    return this.UserModel.getByUid(uid);
  }


  async _checkExistance({uid}){
    // Validate wether user already exist
    if (await this.UserModel.exist(uid)) {
      const error = new Error('ValidationError');
      error.details = {message: 'User already exist'};
      throw error;
    }

    return;
  }

  async _validate(user) {
    //We could call validate because of 'structure' library we defined as domain
    const { valid, errors } = user.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;
      throw error;
    }
  }

}

module.exports = MongoUserRepository;
