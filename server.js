const express = require('express');

const app = express();

app.use(express.static('./dist/spa-fiap-lembretes'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/spa-fiap-lembretes/'}),
);

app.listen(process.env.PORT || 8080);