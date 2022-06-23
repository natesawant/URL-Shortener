const express = require('express');
const MemoryDatabase = require('./memorydatabase');
const app = express();
const port = 3000;

const db = new MemoryDatabase();

app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

app.get('/test', (req, res) => {
    res.send('Testing!');
});

app.get('/:shorturl', (req, res) => {
    console.log('Attempting to fetch long url from short url.');

    let shorturl = req.params.shorturl;
    let longurl;

    // Get the long url from short url.
    try {
        db.getLongURL(shorturl);
    } catch (e) {
        res.status(400).send(e.message);
    }

    // Else, return long url and update statistics.
    res.status(200).send(longurl);
})

app.post('/', (req, res) => {
    let shorturl = req.body.shorturl;
    let longurl = req.body.longurl;

    console.log(`Attempting to add shorten url. ${shorturl} -> ${longurl}`);

    try {
        shorturl = db.addLongURL(longurl, shorturl);
    } catch (e) {
        res.status(400).send(e.message);
    }

    res.status(200).send(shorturl);
});