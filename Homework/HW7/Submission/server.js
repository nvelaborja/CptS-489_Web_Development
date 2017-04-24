/********************************************************************************\
	Nathan VelaBorja - 11392441
	April 11, 2017
	CptS 489 HW 7
		This sever determines whether a dir or file is requested through the url.
		Running localhost:8080/ will return xml representing the root directory.
\********************************************************************************/

var http = require("http");
var fs = require("fs");
var pathNodeJS = require("path");

// First make sure we have a runtime arg for the directory we want to host
if (process.argv.length <= 2) {
	console.log("Usage: node server.js dir");
	process.exit(-1);
}

var path = process.argv[2];

var handler = function(request, response) {

	// Only allowing "GET" right now
	if (request.method != "GET") {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.end("<html><h1>400 Bad Request</h1></body>");
		return;
	}

	// Determine if url is requesting a dir or file
	var url = request.url.toLowerCase();
	var fullPath = pathNodeJS.join(path, url);
	fullPath = decodeURI(fullPath);
	var stats = fs.statSync(fullPath);

	if (stats.isFile()) {

		// Get file extension
		var lastDotIndex = fullPath.lastIndexOf(".");
		var extension = "";
		if (lastDotIndex > -1) {
			extension = fullPath.substr(lastDotIndex).toLowerCase();
		}

		// Set content type based on extension
		var contentType;
		switch (extension) {
			case ".html":
				contentType = "text/html";
				break;
			case ".htm":
				contentType = "text/html";
				break;
			case ".xml":
				contentType = "text/xml";
				break;
			case ".pdf":
				contentType = "application/pdf";
				break;
			case "gif":
				contentType = "image/gif";
				break;
			case "jpeg":
				contentType = "image/jpeg";
				break;
			case "jpg":
				contentType = "image/jpeg";
				break;
			case "json":
				contentType = "application/json";
				break;
			default:
				contentType = "application/octet-stream";
				break;
		}

		// Open the read stream for the file
		var readStream = fs.createReadStream(fullPath);

		// Start writing!
		response.writeHead(200, {"Content-Type": contentType, "Access-Control-Allow-Origin": "*"});
		readStream.on('data', function(chunk) {
			response.write(chunk);
		});
		readStream.on('end', function() { response.end(); });

	}
	else if (stats.isDirectory()) {
		
		var xml = xmlBeginObject("file_list");

		var items = fs.readdirSync(fullPath);
 
		for (var i = 0; i < items.length; i++) {
			// TODO: validate the request directory / path

			// Skip hidden files
			if (items[i].startsWith("."))
				continue;

			var file = pathNodeJS.join(fullPath, items[i]);

			var stats = fs.statSync(file);
			var fileOrDir;

			if (stats.isDirectory()) {
				fileOrDir = "directory";
			}
			else if (stats.isFile()) {
				fileOrDir = "file";
			}
			else continue;

			// Create xml for file
			if (fileOrDir == "file") {
				var fileXML = xmlBeginObject("file");
				fileXML += xmlObject("title", items[i]);
				fileXML += xmlObject("size", stats.size);
				fileXML += xmlObject("accessed", stats.atime);
				fileXML += xmlObject("created", stats.birthtime);
				fileXML += xmlObject("ref", pathNodeJS.join(url, items[i]));
				fileXML += xmlEndObject("file");

				xml += fileXML;
				continue;
			}

			// Create xml for dir
			var dirXML = xmlBeginObject("dir");
			dirXML += xmlObject("title", items[i]);
			dirXML += xmlObject("size", stats.size);
			dirXML += xmlObject("accessed", stats.atime);
			dirXML += xmlObject("created", stats.birthtime);
			dirXML += xmlObject("ref", pathNodeJS.join(url, items[i]));
			dirXML += xmlEndObject("dir");

			xml += dirXML;
		}

		xml += xmlEndObject("file_list");

		response.writeHead(200, {"Content-Type": "text/xml", "Access-Control-Allow-Origin": "*"});
		response.write(xml);
		response.end();
	}
	else {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.end("<html><h1>400 Not a File or Directory</h1></body>");
	}
}

var xmlBeginObject = function(objectName) {
	return "<" + objectName + ">";
}

var xmlEndObject = function(objectName) {
	return "</" + objectName + ">";
}

var xmlObject = function(objectName, value) {
	return "<" + objectName + ">" + value + "</" + objectName + ">";
}

http.createServer(handler).listen(8080);