var express = require('express');
var router = express.Router();

router.all('/', (req, res) => {
    res.render('index', {title: 'Converging Waves'});
});

router.get('/circles', (req, res) => {
    res.sendFile('circles.html', { root: 'public' });
});

module.exports = router;
