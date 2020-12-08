
const socket = io();

function scrollToView() {
    let messages = document.querySelector('#chat').lastElementChild;
    messages.scrollIntoView();
}

socket.on('connect', () => {
    console.log('Connected to server!');
})

socket.on('disconnect', () => {
    console.log('Disconnected to server!');
})

socket.on('newMessage', (message) => {
    const time = new Date(message.time);
    const formatedTime = moment(time.getTime()).format("LT")
    const template = document.querySelector('#message-template').innerHTML;
    const html = Mustache.render(template, {
        "author": message.author,
        "content": message.content,
        "time": formatedTime
    });

    const div = document.createElement('div');
    div.innerHTML = html;

    document.querySelector('#chat').appendChild(div);
    scrollToView()
})

document.querySelector('#main-form-button').addEventListener("click", (e) => {
    e.preventDefault();

    socket.emit("createMessage", {
        author: "A unknow user",
        content: document.querySelector('input[name=message]').value,
        time: new Date()
    })
    document.querySelector('input[name=message]').value = ""
})