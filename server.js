var express        = require('express'),
    app            = express(),
    cors           = require('cors'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override');

require('locus');

// === Middleware === //
app.use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended:false}))
  .use(methodOverride('_method'))
  .use(express.static('public'));

app.options('*', cors());

// === Routes === //

app.post('*', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html');
})

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html')
});

// === Server === //

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log('Server is listening.');
});
//
