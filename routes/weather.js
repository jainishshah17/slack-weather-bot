var express = require('express');
var router = express.Router();
var request = require('request');


var getCurrent = function (zipcode) {
    var url = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + "&appid=" + process.env.OPENWEATHER_API;
    request(url, function (err, response, body) {
        if (err) {
            console.log('error:', error);
        } else {
            var weather = JSON.parse(body);
            var message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
            console.log(message);
            return message;
        }
    });
};

module.exports = {getCurrent};
