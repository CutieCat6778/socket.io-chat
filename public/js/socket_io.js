const socket = io();

socket.on('connect', () => {
    console.log('Connected to server!');
})

socket.on('disconnect', () => {
    console.log('Disconnected to server!');
})

socket.on('newMessage', (message) => {
    console.log(message);
    const li = document.createElement('li');
    li.innerText = `${message.author}: ${message.content}`;
    li.classList.add("text");
    document.querySelector('body').appendChild(li);
})

document.querySelector('#main-form-button').addEventListener("click", (e) => {
    e.preventDefault();

    socket.emit("createMessage", {
        author: "User",
        content: document.querySelector('input[name=message]').value,
        time: new Date()
    })
    document.querySelector('input[name=message]').value = ""
})