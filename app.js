const path = require('path');
const http = require('http');
const express = require('express');
const socket_io = require('socket.io');
const logger = require('morgan');
const indexRouter = require('./routes/root');
const createError = require('http-errors');
require('dotenv').config();

const port = process.env.port || 3000;
const app = new express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use('/', indexRouter);

const server = http.createServer(app);
const io = socket_io(server);

io.on('connection', (socket) => {
	console.log(`New user just connected`);
	
	socket.emit('newMessage', {
		from: "Admin",
		content: 'Wellcome to the chat',
		time: new Date()
	});

	socket.broadcast.emit('newMessage', {
		from: "Admin",
		content: 'New user just joined the chat!',
		time: new Date()
	});

	socket.on('createMessage', (message) => {
		console.log(message);
		io.emit('newMessage', {
			author: message.author,
			content: message.content,
			time: message.time
		})
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

