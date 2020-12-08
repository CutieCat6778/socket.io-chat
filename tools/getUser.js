const Users = require('../model/users');
const bcrypt = require('bcrypt');

module.exports = async (username, password) => {
    console.log(username, password)
    const user = await Users.findOne({username: username}).catch(e => console.log(e))
    console.log(user)
    if(user){
        if(user.username == username){
            return await bcrypt.compare(password, user.password)
        }else return false
    }else return false;
}