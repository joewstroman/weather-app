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

async function fetchFromApi(action, req) {
  let params = {
    cache: "no-cache",
    headers: {
        "Content-Type": "application/json",
    },
    method: action.toUpperCase(),
    mode: "cors"
  }

  if (action.toUpperCase() === 'POST') {
    for (let key in req.body) {
      // Check for unsafe characters
      if (req.body[key].constructor === String && req.body[key].match(/[^\w,.@ ]/)) {
        return { req: req, status: '300', statusText: `Request not allowed with ${key}: ${req.body[k]}` };
      }
    }
    params.body = JSON.stringify(req.body);
  }
  return fetch('http://restapi:80' + `/api/${process.env.MYSQL_TABLE_NAME}`, params)
}

var jsonParser = bodyParser.json();

module.exports = function(app) {
  app.post('/send', jsonParser, sendToXmySql);
  app.get('/get', getFromXmySql);
}
