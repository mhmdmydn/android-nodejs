require("dotenv").config()
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('passport');
const morgan = require('morgan');
const connectDb = require('./app/config/db');
connectDb();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
//session
app.use(
  session({
    secret: 'ghodel',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
mongoUrl: process.env.MONGODB_URI }),
  })
)

//passport
app.use(passport.initialize())
app.use(passport.session())

// Passport config
require('./app/config/Passport')(passport)


// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  
  next()
})



app.get('/' , (req, res ) =>{

res.send('server is running');

});

app.use('/auth', require('./routes/AuthRoutes'))

app.listen(PORT, ()=> {

console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);

});