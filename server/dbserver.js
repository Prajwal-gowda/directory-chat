var request = require("request");
let database = require("./database/db");
let mongoose = require("mongoose");

var options = {
  method: "GET",
  url: "https://lobbyassist-backend.ymedia.in/read/api/v1/getAllEmployees",
  headers: {
    "cache-control": "no-cache",
    Connection: "keep-alive",
    "Accept-Encoding": "gzip, deflate",
    Host: "lobbyassist-backend.ymedia.in",
    "Postman-Token":
      "80b67d5b-2c85-4069-b997-063eb50ef22f,8cc5f0ad-4b85-480a-9751-882eb3e28889",
    "Cache-Control": "no-cache",
    Accept: "*/*",
    "User-Agent": "PostmanRuntime/7.19.0",
    interimSessionToken: "e383dbdf-dd11-4440-8601-6c54b51b8d0a"
  }
};

request(options, function(error, response, body) {
  if (error) throw new Error(error);
  var employeeData = JSON.parse(body);
  var data = employeeData["employees"];
  // response.send(data);

  mongoose.connect(database.db, function(err, db) {
    if (err) throw err;
    var myobj = data;
    db.collection("users").insert(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  });
});
