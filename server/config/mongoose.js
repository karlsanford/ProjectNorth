var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function(config){
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error',console.error.bind(console,'db connection error...'));
    db.once('open',function callback(){
        console.log('projectNorth db opened');
    });

    var userSchema = mongoose.Schema({
        firstName:String,
        lastName:String,
        username:String,
        salt:String,
        hashed_pwd:String,
        roles:[String]
    });
    userSchema.methods = {
        authenticate: function(passwordToMatch){
            return hashPwd(this.salt,passwordToMatch) === this.hashed_pwd;
        }
    }

    var User = mongoose.model('User',userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            var salt,hash;
            salt = createSalt();
            hash = hashPwd(salt,'karl');
            User.create({firstName: 'Karl', lastName: 'Sanford', username: 'karlsanford',salt:salt,hashed_pwd:hash,roles:['admin']});
            salt = createSalt();
            hash = hashPwd(salt,'misty');
            User.create({firstName: 'Misty', lastName: 'Sanford', username: 'mistysanford',salt:salt,hashed_pwd:hash,roles:[]});
            salt = createSalt();
            hash = hashPwd(salt,'fred');
            User.create({firstName: 'Fred', lastName: 'Sanford', username: 'fredsanford',salt:salt,hashed_pwd:hash});
        }
    })

};

function createSalt(){
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd){
    var hmac = crypto.createHmac('sha1',salt);
    return hmac.update(pwd).digest('hex');
}


