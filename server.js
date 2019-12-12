'use strict';

//dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();

// global variables
const PORT = process.env.PORT;
const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY;
const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;
const app = express();
app.use(cors());

// routes
app.get('/location', getLocation);
app.get('/weather', getWeather);
// app.get('/events', getEvents);

// CONSTRUCTOR
function Location(coordinates){
  this.formatted_query = coordinates.formatted_address;
  this.latitude = coordinates.geometry.location.lat;
  this.longitude = coordinates.geometry.location.lng;
}

function Weather(location){
  this.time = new Date(location.time).toDateString();
  this.forecast = location.summary
}

// routes functions handlers
function getLocation(req, res){
  // console.log('req.query', req.query) // { data: 'lynnwood' }
  const whatTheUserSearchedFor = req.query.data;
  superagent.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${whatTheUserSearchedFor}&key=${GEOCODING_API_KEY}`).then(response => { 
  // console.log('response.body', response.body); // Gives the Object data of the info requested

    res.send({
      'search_query': whatTheUserSearchedFor,
      'formatted_query': response.body.results[0].formatted_address,
      'latitude': response.body.results[0].geometry.location.lat,
      'longitude': response.body.results[0].geometry.location.lng
    });
  });
}

function getWeather(req, res){
  console.log('req.query', req.query);

  superagent.get('https://api.darksky.net/forecast/&key=${DARKSKY_API_KEY}/37.8267,-122.4233').then(response => {
    console.log('response.body', response.body)

  })
  
}



app.listen(PORT, () => console.log(`up on port ${PORT}`));