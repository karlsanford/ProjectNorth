var mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User'),
    LocalStrategy = require('passport-local').Strategy;


module.exports = function(){

    passport.use(new LocalStrategy(
        function(username, password, done){
            console.log('LocalStrategy: username:' + username);
            User.findOne({username:username}).exec(function(err, user){
                if(user && user.authenticate(password)){
                    return done(null,user);
                }else{
                    return done(null,false);
                }
            });
        }
    ));

    passport.serializeUser(function(user,done){
        console.log('serializing user...userid:' + user._id);
        if(user){
            console.log('user is present');
            done(null, user._id);
        }else{
            console.log('serializeUser: user is not present');
        }
    });

    passport.deserializeUser(function(id,done){
        console.log('deserializing user...');
        User.findOne({_id:id}).exec(function(err, user){
            if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        });
    });
}