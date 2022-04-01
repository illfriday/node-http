//IMPORTS the NODE HTTP CORE MODULE
const http = require("http");

//Set up the server name and port
const hostname = "localhost";
const port = 3000;

//Adding the PATH and FILESYSTEM CORE NODE MODULES to enable our SERVER to serve static html files
const path = require("path");
const fs = require("fs");

//Use the createServer() METHOD, passing in a CALLBACK FUNCTION with 2 PARAMETERS, REQUEST(req) & RESPONSE(res). These are special types of OBJECTS called STREAMS, which send packaged date in small chunks. We will be creating the REQUEST OBJECT and the SERVER will automatically create the RESPONSE OBJECT when the REQUEST is received. We don't create the RESPONSE, but we can later add information to it.

//We are CONSOLE LOGGING the REQUEST HEADERS. Setting the STATUS CODE of the RESPONSE to 200(OK!), Telling the SERVER we are sending TEXT/HTML content & writing and inline HTML structure as the RESPONSE BODY in the res.end() METHOD(instead of using res.write + res.end() bc the content is simple in this case)

// const server = http.createServer((req, res) => {
//   console.log(req.headers);
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/html");
//   res.end("<html><body><h1>Hello World!</h1></body></html>");
// });

//The above code^^^ will serve the same HTML response no matter what METHOD is contained in the REQUEST(GET, POST, DELETE, ETC.). Below, We will update the code to provide different RESPONSES based on the REQUEST METHOD provided

const server = http.createServer((req, res) => {
  console.log(`Requst for ${req.url} by method ${req.method}`);

  if (req.method === "GET") {
    let fileUrl = req.url;
    if (fileUrl === "/") {
      fileUrl = "/index.html";
      //if no fileURL indicated, automatically return index.html
    }

    const filePath = path.resolve("./public" + fileUrl);
    //converts the RELATIVE FILE PATH to ABSOLUTE PATH. Look in the 'public' FOLDER, add the 'fileUrl'

    const fileExt = path.extname(fileUrl);
    if (fileExt === ".html") {
      //check if file exists on the server using the fs.access() NODE CORE METHOD, passing 2 ARGUMENTS(filePath & a CALLBACK FUNCTION for handling errors)
      fs.access(filePath, (err) => {
        if (err) {
          res.statusCode = 404;
          res.setHeader = ("contentType", "text/html");
          res.end(
            `<html><body><h1>Error 404: ${fileUrl} not found.</h1></body></html>`
          );
          return;
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");

        //Use createReadStream() METHOD to create a NEW STREAM OBJECT and send it to the STREAM OBJECT(RESPONSE(res)) using the pipe() METHOD available from the  NODE STREAMS CORE MODULE. pipe() sends on STREAM OBJECT to another. STREAM OBJECTS load data in small chunks instead of all at once. By default, when createReadStream() is finished it will cause the RESPONSE OBJECT to end, so you don't need to use the res.end() METHOD
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      //We are not supporting any FILE EXTENSION types other than HTML at this time, returning a 404 if any other FILE EXTENSION is found
      res.statusCode = 404;
      res.setHeader = ("contentType", "text/html");
      res.end(
        `<html><body><h1>Error 404: ${fileUrl} is not an html file.</h1></body></html>`
      );
    }
  } else {
    //We are not supporting any METHODS other than GET at this time, returning a 404 if any other REQUEST METHOD is used
    res.statusCode = 404;
    res.setHeader = ("contentType", "text/html");
    res.end(
      `<html><body><h1>Error 404: ${req.method} not supported.</h1></body></html>`
    );
  }
});

//START THE SERVER using the server.listen() METHOD. Pass the PORT and HOSTNAME VARIABLES we created AS ARGUMENTS, with a 3rd ARGUMENT, a CALLBACK FUNCTION to be executed when the SERVER is running
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
