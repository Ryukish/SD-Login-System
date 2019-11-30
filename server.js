const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const lar = require("./routes/api/LoginAndRegister");
const sa = require("./routes/api/SuperAdmin");
const passport = require("passport");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());



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

