const Users = require('../model/users');
const bcrupt = require('bcrypt');

module.exports = async (username, password) => {
    const oldUser = await Users.findOne({ username: username }).catch(e => console.log(e))
    console.log(oldUser == null)
    if (oldUser == null) {
        bcrupt.hash(password, 10, function (err, hash) {
            if (err) throw err;
            else if (!err) {
                if (hash.length < 5) return false;
                const user = new Users({
                    _id: require('./idGenerator')(),
                    username: username,
                    password: hash
                })
                user.save().catch(e => console.log(e));
                return user;
            }
        });
    } else return console.log("Bruh")
}