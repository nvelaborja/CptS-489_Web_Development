/*
	Nathan VelaBorja
	April 15, 2017
	CptS 489 HW 8
	server.js
*/

var http = require("http");
var fs = require("fs");
var pathNodeJS = require("path");

// First make sure we have a runtime arg for the directory we want to host
if (process.argv.length <= 2) {
	console.log("Usage: node server.js dir");
	process.exit(-1);
}

var path = process.argv[2];
console.log("Server started at path: " + path);

var imageData = null;

var handler = function(request, response) {

	console.log("Request Received: " + request.url + " method: " + request.method);

	// Send image or html page
	if (request.method === "GET") {
		var url = request.url.toLowerCase();

		// If url is html page, send that
		if (url === "/camuploader.html") {
			var contentType = "text/html";

			var fullPath = pathNodeJS.join(path, url);
			fullPath = decodeURI(fullPath);

			// Open the read stream for the file
			var readStream = fs.createReadStream(fullPath);

			// Start writing!
			response.writeHead(200, {"Content-Type": contentType, "Access-Control-Allow-Origin": "*"});
			readStream.on('data', function(chunk) {
				response.write(chunk);
			});
			readStream.on('end', function() { response.end(); });

			return;
		}

		// If url is html page, send that
		if (url === "/camviewer.html") {
			var contentType = "text/html";

			var fullPath = pathNodeJS.join(path, url);
			fullPath = decodeURI(fullPath);

			// Open the read stream for the file
			var readStream = fs.createReadStream(fullPath);

			// Start writing!
			response.writeHead(200, {"Content-Type": contentType, "Access-Control-Allow-Origin": "*"});
			readStream.on('data', function(chunk) {
				response.write(chunk);
			});
			readStream.on('end', function() { response.end(); });

			return;
		}

		// Otherwise send image
		if (imageData !== null) {
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.end(imageData);
			return;
		}
	}

	// Receive image
	if (request.method === "POST") {
		var data = "";

		request.on("data", function(chunk) {
			data += chunk;
		});

		request.on("end", function() {
			imageData = data;
			response.end();
		});
	}
}

http.createServer(handler).listen(8080);