const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('./usernames');

passport.serializeUser(function (user, done) {
    // console.log('serialize');
    done(null, user.id)
});

passport.deserializeUser(function (userId, done) {
    // console.log('deserialize-passport');
    done(null, users[userId])
});

const localStrategy = new LocalStrategy(
    function (username, password, done) {
        console.log('local strategy');
        for (let i in users) {
            if (users[i].username == username) {
                if (users[i].password == password) {
                    users[i].id = i;
                    done(null, users[i])
                } else {
                    done(null, false, {message: 'Wrong password'})
                }
            }
            // else {
            //     done(null, false, {message: 'User not found'})
            // }
        }
    }
);

passport.use(localStrategy);
module.exports = passport;