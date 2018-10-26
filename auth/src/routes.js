'use strict';
var fetch = require('node-fetch');
var bodyParser = require('body-parser');

function returnResponse(res) {
  return (resp) => { 
    var output = `${res.req.url} - ${resp.status} - ${resp.statusText}\n`
    console.log(output);
    res.status(resp.status).send(output); 
  };
}

async function sendToXmySql(req, res) {
  fetchFromApi("POST", req)
  .then(returnResponse(res))
  .catch(returnResponse(res))
}

function getFromXmySql(req, res) {
  fetchFromApi("GET", req)
  .then(returnResponse(res))
  .catch(returnResponse(res))
}

function fetchFromApi(action, req) {
  let params = {
    cache: "no-cache",
    headers: {
        "Content-Type": "application/json",
    },
    method: action.toUpperCase(),
    mode: "cors"
  }
  if (Object.keys(req.body).length) params.body = JSON.stringify(req.body);
  return fetch('http://restapi:80' + `/api/${req.params.table}`, params)
}

var jsonParser = bodyParser.json();

module.exports = function(app) {
  app.post('/:table', jsonParser, sendToXmySql);
  app.get('/:table', getFromXmySql);
}
