const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport=require('passport');
// const GoogleStragety = require('passport-google-oauth20')

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// DB Config
const db = require('./config/keys').mongoURI;
const authRoutes = require('./routes/OAuth')

// const keys = require('./config/OAuth/keys')
app.use(passport.initialize());

// passport.use(new GoogleStragety({
//     clientID: keys.googleClientID,
//     clientSecret: keys.googleClientSecret,
//     callbackURL: '/auth/google/callback'
// }, accessToken => {
//     console.log(accessToken)
// }));

// app.get('/auth/google', passport.authenticate('google', {
//     scope: ['profile', 'email']
// }))

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// // Passport middleware
// app.use(passport.initialize());
// const OAuth= require('./routes/OAuth')
// app.get('')



//local DB for dev remote for production
if (process.env.NODE_ENV === 'production') {
    const db = require('./config/keys').mongoURI;
    //static folder for deployment
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
} else {  
    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/YourNewDB") 
    // above code is for  connecting to mongoDB through a local host 
    //  MAKE SURE TO CREATE A DB and put the DB NAME below 
            // example:  mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost/myDB")
       app.use(express.static('client/public/index.html'));
        }

const PORT = process.env.PORT || 5000
app.listen(PORT);
console.log('Served to port ' + PORT);

