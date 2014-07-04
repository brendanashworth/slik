/* Le app */
var handlebars = require('handlebars');
var FtpClient = require('ftp');

function Messager(element) {
	this.element = element;
}

Messager.prototype.newMessage = function(level, text) {
	$(this.element).removeClass();
	$(this.element).addClass('alert alert-' + level);
	$(this.element + ' p').text(text);
};

messageBox = new Messager('#message');

// init
var client = new FtpClient();
client.on('ready', function() {
	// message
	messageBox.newMessage('info', 'Connected to FTP server.');

	client.list('/', false, function(err, list) {
		console.log(err);
		console.log(list);
	});
});

$(document).ready(function() {
	$('.input-details input[type="submit"]').click(function(event) {
		$('.input-details input[type="submit"]').addClass('disabled');

		client.connect({
			host: $('.input-details input[name="host"]').val(),
			port: $('.input-details input[name="port"]').val(),
			user: $('.input-details input[name="user"]').val(),
			password: $('.input-details input[name="password"]').val()
		});

		console.log('Connected');
	});
});
