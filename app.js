// const http = require('http');
// const fs=require('fs').promises;

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });
// let indexFile;

// const requestListener = function (req, res) {
//     res.setHeader("Content-Type", "text/html");
//     res.writeHead(200);
//     res.end(indexFile);
// };




// fs.readFile(__dirname + "/index.html")
//     .then(contents => {
//         indexFile = contents;
//         server.listen(port, host, () => {
//             console.log(`Server is running on http://${host}:${port}`);
//         });
//     })
//     .catch(err => {
//         console.error(`Could not read index.html file: ${err}`);
//         process.exit(1);
//     });

// const requestListener=function(req,res){
// 	fs.readFile(__dirname+"/index.html")
// 		.then(contents => {
//             res.setHeader("Content-Type", "text/html");
//             res.writeHead(200);
//             res.end(contents);
//         })
//         .catch(err => {
//             res.writeHead(500);
//             res.end(err);
//             return;
//         });
// };
// const server = http.createServer(requestListener);
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;

let db;

app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect("mongodb://localhost:27017/", (err, database) => {
  if(err) {
    return console.log(err);
  }
  db = database.db("test");
  // start the express web server listening on 3000
  app.listen(3000);
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/clicked', (req, res) => {
	db.collection("items").findOne({}, (err, result) =>{
		res.send(result);
	});
});
