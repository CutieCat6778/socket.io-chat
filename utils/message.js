const moment = require('moment');

const generateMessage = class newMessage {
    constructor(obj) {
        this.author = obj.author;
        this.content = obj.content;
        this.time = moment().valueOf()
    }
}

module.exports = {generateMessage: generateMessage};