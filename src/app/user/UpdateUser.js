const Operation = require('src/app/Operation');
const User = require('src/domain/user/User');

class UpdateUser extends Operation {
  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute({uid, authority, name, gender, location, website, picture}) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;


    const user = new User({uid, authority, profile: {name, gender, location, website, picture}});

    try {
      const updateUser = await this.usersRepository.update(user);

      this.emit(SUCCESS, updateUser);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

UpdateUser.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = UpdateUser;