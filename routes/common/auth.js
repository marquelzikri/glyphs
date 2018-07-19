const User = require('../../models/User');
const Profile = require('../../models/Profile');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const register = registerData => {
  // registerData is req.body
  let returnNewUser;

  User.findOne({ email: registerData.email })
    .then(user => {
      if (user) {
        return ({ status: '400', email: 'Email already exists' })
      }else{
        let newUser;
        if (registerData.authType === 'google') {
          newUser = new User({
            name: registerData.name,
            email: registerData.email,
            password: '17W4r6AbC', //default dummy password
            avatar: registerData.avatar,
            googleId: registerData.googleId
          });
        }else{
          const avatar = gravatar.url(registerData.email, {
            s: '200', // Size
            r: 'pg', // Rating
            d: 'mm' //Default
          });
  
          newUser = new User({
            name: registerData.name,
            email: registerData.email,
            password: registerData.password,
            avatar
          });
        }

        bcrypt.genSalt(10, (err,salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save()
              .then(user => {
                const newProfile = new Profile ({
                  user: user._id
                });
                newProfile.save();

                returnNewUser = user;
                console.log(user);
                return ({ status: '200', data: returnNewUser});
              })
              .catch(err => {
                return({ status: '400', err })
              });
          });
        });
      }
    }).catch(err=>err);

    return ({ status: '200', data: returnNewUser});
}

module.exports = {
  register
}
