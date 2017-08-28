var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var confiq={
    user:'praiselinvictor',
    database:'praiselinvictor',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
}
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
var person={
    name:'jerk',
    age:'24',
    dateOfBirth:'May 11,1994'
}

function createTemplate(data)
{
    var name=data.name;
     var age=data.age;
      var dateOfBirth=data.dateOfBirth;
   
   var htmlTemplate=`
   
   <html>
   
   <head>
   <title>
   ${name}
   </title>
   
   </head>
   
   <body>
   <div class="container">
   <a href="http://praiselinvictor.imad.hasura-app.io">Home</a>
   <h3>${name}<h3>
   <div>${age}</div>
   <div>${dateOfBirth}</div>
   
   
   
   </div>
   
   </body>
   </html>`
   return htmlTemplate;
   
   
   
}
var pool=new Pool(confiq);
app.get('/test-db', function (req, res) {
    pool.query('SELECT * FROM user',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
    });
    
});

function hash(input,salt)
{
    var hashed=crypto.pbkdf2Sync('secret', 'salt', 100000, 512, 'sha512');
    return hashed.toString('hex');
}

app.get('/hash/:input', function (req, res) {
    var hashedString=hash(req.params.input,'this-is-a-string');
  res.send(hashedString);
});


app.get('/create-user', function (req, res) {
   // var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    pool.query('Insert into "userTable" (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send('User Successfully created:'+username);
            
        }
    });

});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/new-file', function (req, res) {
  res.send(createTemplate(person));
});
var counter=0;
app.get('/counter',function (req,res)
{
    counter=counter+1;
    res.send(counter.toString()); 
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
