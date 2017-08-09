var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

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
   <h3>${name}<h3>
   <div>${age}</div>
   <div>${dateOfBirth}</div>
   
   
   
   </div>
   
   </body>
   </html>`
   return htmlTemplate;
   
   
   
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/new-file', function (req, res) {
  res.send(createTemplate(person));
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
