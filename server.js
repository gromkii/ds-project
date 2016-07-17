var express        = require('express'),
    app            = express(),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override');

require('locus');

// === Middleware === //
app.use(bodyParser.json())
  .use(bodyParser.urlencoded({extended:false}))
  .use(methodOverride('_method'))
  .use(express.static('public'));

// === Routes === //

app.get('/results', (req, res) => {
  eval(locus);
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html')
});

// === Server === //

app.listen(3000, (req, res) => {
  console.log('Server is listening.');
});
