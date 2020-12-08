require('dotenv').config();
const path = require('path');
const http = require('http');
const express = require('express');
const socket_io = require('socket.io');
const logger = require('morgan');
const indexRouter = require('./routes/root');
const createError = require('http-errors');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { generateMessage } = require('./utils/message');
const port = process.env.PORT || 3000;
const app = new express();

mongoose.connect("mongodb+srv://Developers:23072006@discordbot-trademark.p1wmj.mongodb.net/chatapp?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, () => {
	console.log("Mongo connected!")
})
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use('/', indexRouter);


const server = http.createServer(app);
const io = socket_io(server);

io.on('connection', (socket) => {
	console.log(`New user just connected`);

	socket.emit('newMessage', new generateMessage({
		"author": "System",
		"time": new Date(),
		"content": "Welcome to the chat!"
	}));

	socket.broadcast.emit('newMessage', new generateMessage({
		"author": "System",
		"time": new Date(),
		"content": "A new user just joined the chat!"
	}));

	socket.on('createMessage', (message) => {
		console.log(message);
		io.emit('newMessage', new generateMessage({
			"author": message.author,
			"time": message.time,
			"content": message.content
		}))
	})

	socket.on('disconnect', () => {
		console.log(`A user was disconnected from the server!`);
	})

})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error', { error: err.message });
});

server.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})

