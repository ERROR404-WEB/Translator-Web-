const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {

  res.sendFile(__dirname + "/index.html");

});

app.post('/', function (req, res) {

  var s = req.body.source;
  var t=req.body.target;

  
  const options = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': '0a81ca7cb1msh6f9116a1f382031p1cc6f6jsn3713fb5e0f52',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
      useQueryString: true
    },
    form: { q: s, target: t }

  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var d=JSON.parse(body);
    var dd=d.data.translations[0].translatedText;
    
    res.send("<body style='text-align:center'><h1>Translated Text : </h1> </body>"+dd);
  });
  

});









app.listen(process.env.PORT || 3000, function (req, res) {

  console.log("server started");
});