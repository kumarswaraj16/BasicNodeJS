const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer(function(req,res){

	console.log('request from ' + req.url + 'by method ' + req.method);

	// to see who is requesting on server
    // console.log(req.headers);
    if(req.method == 'GET'){
    	var fileUrl;
    	if(req.url == '/'){
    		fileUrl = "/index.html";
    	}else{
    		fileUrl = req.url;
    	}
    	var filePath = path.resolve("./public"+fileUrl);
    	const fileExt = path.extname(filePath);

    	if(fileExt == '.html'){
    		fs.exists(filePath, function(exists){
               if(!exists){
               	res.statusCode = 404;
               	res.setHeader('Content-Type','text/html');
               	res.end(`<html> <body> <h1> Error 404: ${fileUrl} doesn't exists </h1> </body> </html>`);
               }

               res.statusCode = 200;
               res.setHeader('Content-Type','text/html');
               fs.createReadStream(filePath).pipe(res);
    		});
    	}else{
    		res.statusCode = 404;
            res.setHeader('Content-Type','text/html');
            res.end(`<html> <body> <h1> Error 404: ${fileUrl} not a HTML file </h1> </body> </html>`);
    	}
    }else{
        res.statusCode = 404;
        res.setHeader('Content-Type','text/html');
        res.end(`<html> <body> <h1> Error 404: ${fileUrl} NOT SUPPORTED </h1> </body> </html>`);   
    } 

    // res.statusCode = 200;
    // res.setHeader('Content-Type','text/html');

    // to end the response by telling them connection is connected
    // res.end(`<html> <body> <h1> Server connection succes :) </h1> </body> </html>`);
});

server.listen(port, hostname, function() {
    console.log(`server running at http://${hostname}:${port}`);
});