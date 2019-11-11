const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const lar = require("./routes/api/LoginAndRegister");
const sa = require("./routes/api/SuperAdmin");
const passport = require("passport");
const rateLimit = require("express-rate-limit");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

const limiter = rateLimit({
    windowMs: 3 * 60 * 1000, 
    max: 4
  });

app.use(cors());
app.use(express.json());
app.use(limiter);


const uri = process.env.u;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection;

app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/lar", lar);
app.use("/api/sa", sa);

connection.once('open', () => {
    console.log("MongoDB database has established connection");
})

app.listen(port, () => {
    console.log(`Server is up and running-port: ${port}`);
})

