module.exports = () => {
    const Generator = require('id-generator');
    const generator = new Generator();

    return generator.newId();
}