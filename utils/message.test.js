const expect = require('expect');

const {generateMessage} = require('./message');

describe('Generate Message', () => {
    it("should generate correct message object", async () => {
        const obj = {
            author: "Tester",
            content: "I am testing my class",
            time: new Date()
        }
        const generatedMessage = new generateMessage(obj);
        expect(generatedMessage).toMatchObject(obj);
    })
})