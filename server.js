const express = require("express");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const chat = require("./routes/api/chat");

const app = express();
const port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.log(error));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

//Use Routs
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//Server static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  const server = app
    .use(express.static(path.join(__dirname, "client", "build")))
    .get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    })
    .listen(port, () =>
      console.log(`Server runs in production mode at localhost:${port}`)
    );
  const io = socketIO(server);
  chat(io);
} else {
  const server = app.listen(port, () =>
    console.log(`Server runs at localhost:${port}`)
  );
  const io = socketIO(server);
  chat(io);
}
