var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var qs = require('qs');
var weather = require('./weather');
require('dotenv').config();

var verifySignature = function (req) {
    const signature = req.headers['x-slack-signature'];
    const timestamp = req.headers['x-slack-request-timestamp'];
    const hmac = crypto.createHmac('sha256', process.env.SIGNING_SECRET);
    var requestBody = qs.stringify(req.body,{ format:'RFC1738' });

    const [version, hash] = signature.split('=');

    hmac.update(`${version}:${timestamp}:${requestBody}`);
    return hmac.digest('hex') === hash
};

/* GET home page. */
router.get('/', function (req, res, next) {

    res.send("OK");
});

/* GET home page. */
router.post('/', function (req, res, next) {
    var body = req.body;
    if (body) {
        console.log(body.token);
        console.log(body.command);
        console.log(body.text);
        console.log(body.team_id);
        console.log(body.team_domain);
        console.log(body.channel_id);
        console.log(body.channel_name);
        console.log(body.user_id);
        console.log(body.user_name);
        console.log(body.trigger_id);
        if (verifySignature(req)) {
            res.send(weather.getCurrent(body.text));
        } else {
            res.sendStatus(500);
        }
    }
});

module.exports = router;
