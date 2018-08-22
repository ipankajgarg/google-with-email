const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/Survey");
require("./models/User");
require("./services/passport.js");
const bodyParser = require("body-parser");

mongoose.connect(keys.mongoURI, {
  useMongoClient: true
});
const app = express();
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./routes/billingRoutes")(app);
require("./routes/authRoutes")(app);
require("./routes/surveyRoutes")(app);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// app.get("/", (req, res) => {
//   res.send({ bye: "buddy" });
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server start");
});
//id :559002132235-g84sef1tjan2vdfq9c8fu271054th2id.apps.googleusercontent.com
//secret :jH77DBbp58L_MDYMS4LKB-zT
