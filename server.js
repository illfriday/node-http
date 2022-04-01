//IMPORTS the NODE HTTP CORE MODULE
const http = require("http");

//Set up the server name and port
const hostname = "localhost";
const port = 3000;

//Use the createServer() METHOD, passing in a CALLBACK FUNCTION with 2 PARAMETERS, REQUEST(req) & RESPONSE(res). These are special types of OBJECTS called STREAMS, which send packaged date in small chunks. We will be creating the REQUEST OBJECT and the SERVER will automatically create the RESPONSE OBJECT when the REQUEST is received. We don't create the RESPONSE, but we can later add information to it.

//We are CONSOLE LOGGING the REQUEST HEADERS. Setting the STATUS CODE of the RESPONSE to 200(OK!), Telling the SERVER we are sending TEXT/HTML content & writing and inline HTML structure as the RESPONSE BODY in the res.end() METHOD(instead of using res.write + res.end() bc the content is simple in this case)

const server = http.createServer((req, res) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>Hello World!</h1></body></html>");
});

//START THE SERVER using the server.listen() METHOD. Pass the PORT and HOSTNAME VARIABLES we created AS ARGUMENTS, with a 3rd ARGUMENT, a CALLBACK FUNCTION to be executed when the SERVER is running
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
