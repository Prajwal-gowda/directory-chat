let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let middleware = require("./middleware");
const passport = require("passport");
const http = require("http");
let database = require("./database/db");
const app = express();
const userRoute = require("./routes/userRoutes");
const userSaveRoute = require("./routes/userSaveRoutes");
const getUsersRoute = require("./routes/getUsersRoute");
const getAllUsersRoute = require("./routes/getAllUsersRoute");
const employeeRoute = require("./routes/employeeRoute");
const postroutes = require("./routes/PostRoute");
const dashboardRoute = require("./routes/dashboardRoutes");
// const users = require("./routes/user");
const socketIO = require("socket.io");

const server = http.createServer(app);

const io = socketIO(server);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

mongoose.Promise = global.Promise;
mongoose
  .connect(database.db, {
    useNewUrlParser: true
  })
  .then(
    () => {
      console.log("Database connected sucessfully !");
    },
    error => {
      console.log("Database could not be connected : " + error);
    }
  );

app.use(passport.initialize());
require("./passport")(passport);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
// app.use("/landing", userRoute);
// app.use("/edit-profile", userSaveRoute);
// app.use("/profile", getUsersRoute);
// app.use("/home", getAllUsersRoute);
// app.use("/user", employeeRoute);
app.use("/users", postroutes);
app.use("/dashboard", dashboardRoute);
// app.use("/api/users", users);

const socketOps = require("./socketOps");
socketOps.allSocketOps(io);

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Listening on port ${port}`));
