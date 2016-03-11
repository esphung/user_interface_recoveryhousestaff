var express = require('express');
var path = require('path');
var app = express();




//Lets require/import the HTTP module
var http = require('http');
// require this module to  use a dispatcher
var dispatcher = require('httpdispatcher');

//Lets define a port we want to listen to
const PORT=8000;









// configure app ===========================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// when client requests root page
app.get('/', function (req, res) {
  res.redirect('/home')

})


// get home page view
app.get('/home', function (req, res) {
  // load home page view
  res.render(
    'homepageview', {
    title : "Home Page"
  });
  console.log('\nHome page requested')
})



// get login view
app.get('/login', function (req, res) {
  // load home page view
  res.render(
    'loginpageview', {
    title : "Login Page"
  });
  console.log('\nLogin page requested')
})







//Lets start our server
app.listen(PORT, function(){
  //Callback triggered when server is successfully listening. Hurray!
  console.log("App listening on: http://localhost:%s", PORT);
});


















































/* BASIC HTTP FUNCTIONS */

/*
//Create a server
var server = http.createServer(handleRequest);
*/

/*
//Lets start our server
server.listen(PORT, function(){
  //Callback triggered when server is successfully listening. Hurray!
  console.log("Server listening on: http://localhost:%s", PORT);
});
*/


//We need a function which handles requests and send response
function handleRequest(request, response){
  response.end('It Works!! Path Hit: ' + request.url);
}


//Lets use our dispatcher
function handleRequest(request, response){
  try {
    //log the request on console
    console.log(request.url);
    //Disptach
    dispatcher.dispatch(request, response);
  } catch(err) {
    console.log(err);
  }
}


//For all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic('resources');




//A sample GET request
dispatcher.onGet("/page1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Page One');
});

//A sample POST request
dispatcher.onPost("/post1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Got Post Data');
});
