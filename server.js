const express = require('express')
const app = express()
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const cardRouter = require('./routes/cards')
const mainRoutes = require('./routes/main')
//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

// Public folder
app.use(express.static("public"))


//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Set EJS view engine
app.set('view engine', 'ejs')

// Setup Sessions - stored in MongoDB
app.use(session({
    secret: 'foo',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING })
  }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

app.use('/', mainRoutes)
app.use('/cards', cardRouter)

//Connect To Database
connectDB().then(()=>{
  app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
  })  
})