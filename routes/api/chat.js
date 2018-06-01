const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

router.ws("/", (ws, req) => ws.on("message", msg => ws.send(msg)));

module.exports = router;
