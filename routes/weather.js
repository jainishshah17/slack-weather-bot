var express = require('express');
var router = express.Router();
var request = require('request');


var getCurrentByZip = function (zipcode) {

    console.log("Zipcode is: " + zipcode);
    var options = {
        url: "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + "&units=metric&appid=" + process.env.OPENWEATHER_API,
        method: 'GET'
    };

    // Return new promise
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                reject(error);
            } else {
                var weather = JSON.parse(body);
                var message = `It's ${weather.main.temp}`+ '\xB0C' + ` in ${weather.name}!`;
                var data = {
                    response_type: 'in_channel', // public to the channel
                    text: message,
                    attachments: []
                };
                resolve(data);
            }
        });
    });

};

var getCurrentByCity = function (city) {

    console.log("City is: " + city);
    var options = {
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + process.env.OPENWEATHER_API,
        method: 'GET'
    };

    // Return new promise
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                reject(error);
            } else {
                var weather = JSON.parse(body);
                var message = `It's ${weather.main.temp}`+ '\xB0C' + ` in ${weather.name}!`;
                
                var data = {
                    response_type: 'in_channel', // public to the channel
                    text: message,
                    attachments: []
                };
                resolve(data);
            }
        });
    });

};

module.exports = {getCurrentByZip, getCurrentByCity};
