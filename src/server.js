const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/spa-fiap-lembretes'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+
    '/dist/spa-fiap-lembretes/index.html'));});
app.listen(process.env.PORT || 8080);