var http = require('http'),
	fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode) {
	if(!responseCode) responseCode = 200;
	fs.readFile(__dirname + path, function(err,data) {
		if(err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('500 - Internal Error');
		} else {
			res.writeHead(responseCode, { 'Content-Type': contentType });
			res.end(data);
		}
	});
}


http.createServer(function(req,res){
// 	 переводим URL до єдиного вигляду шляхом видалення
//   рядка запиту, необов'язкового слешу
//   в кінці рядка і приведення до нижнього регістру
	var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

	switch(path) {
		case '':
			serveStaticFile(res, '/public/home.html', 'text/html');
		break;
		
		case '/about':
			serveStaticFile(res, '/public/about.html', 'text/html');
		break;
		
		case '/img/logo.jpg':
			serveStaticFile(res, '/public/img/logo.jpg', 'image/jpeg');
		break;
		
		default:
			serveStaticFile(res, '/public/404.html', 'text/html', 404);
		break;
	}
}).listen(3000 , function() { console.log("Server start: localhost:3000")});
