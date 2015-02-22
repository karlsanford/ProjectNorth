var express = require('express'), //application framework
    stylus = require('stylus'), // serve css
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

//used by stylus middleware
function compile(str,path){
    return stylus(str).set('filename',path);
}

//config
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

//routing
app.use(express.static(__dirname + '/public'));


//db connection

if (env === 'development'){
    mongoose.connect('mongodb://localhost/projectNorth');
}
else {
    //mongodb://<dbuser>:<dbpassword>@ds047581.mongolab.com:47581/projectnorth
    mongoose.connect('mongodb://karlsanford:projectnorth@ds047581.mongolab.com:47581/projectnorth');
}


var db = mongoose.connection;
db.on('error',console.error.bind(console,'db connection error...'));
db.once('open',function callback(){
    console.log('projectNorth db opened');
});

//get data...
var messageSchema = mongoose.Schema({message:String});
var Message = mongoose.model('Message',messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc){
    mongoMessage = messageDoc.message;
});


//more routing
app.get('/partials/:partialPath',function(req,res){
    res.render('partials/' +req.params.partialPath);
});

app.get('*',function(req,res){
   res.render('index',{
       mongoMessage:mongoMessage
   });
});


//start listening
var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');