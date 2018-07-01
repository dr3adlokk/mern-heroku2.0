const express = require('express');
const passport = require('passport');
const GoogleStragety = require('passport-google-oauth20');
const keys = require('../../config/OAuth/keys');

const app = express();

passport.use(new GoogleStragety({
    clientID: keys.googleClientID, 
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, accessToken  => {
    console.log(accessToken)
}));
 
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

app.get(
    './auth/google',
    passport.authenticate('google', {
        scope: [ 'profile','email' ]
    })
);

app.get('/auth/google/callback', passport.authenticate('google'))