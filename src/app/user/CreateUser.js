const Operation = require('src/app/Operation');
const User = require('src/domain/user/User');

class CreateUser extends Operation {
  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute({uid, authority, name, gender, location, website, picture}) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    

    // Everything goes to repository must become Entity first
    const user = new User({uid, authority, profile: {name, gender, location, website, picture}});

    try {
      const newUser = await this.usersRepository.add(user);

      this.emit(SUCCESS, newUser);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreateUser.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreateUser;
