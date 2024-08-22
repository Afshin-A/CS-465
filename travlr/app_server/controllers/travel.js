// GET Homepage

/**
const fs = require('fs');
// TODO: Replace before deployment
// We don't want to read a file everytime a request is received
// fs.readFileSync reads a file synchronously
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));
const travel = (reg, res) => {
    console.log('Rendering travel page');
    res.render('travel', {title: "Travl Getaways", trips});
};
*/

const request = require('request');

// using the fetch api to retrieve the data we need to render views from our database instead of a static file
const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

/**
 * 
 * @param {*} req represents the http request. properties: 
 * - `req.method` method associated with the request (GET, PUT, POST, DELETE)
 * - `req.url` the url of the request
 * - `req.headers` request headers
 * - `req.params` request parameters, like the `id` in `/api/:id`
 * - `req.query` query string parameters, like `John` in `google.com/search?q=John` is accessed by `req.query.q`
 * - `req.body` body of the request
 * - `req.cookies` cookies of the request
 * @param {*} res represents the response. properties/methods:
 * - res.status(code): Sets the HTTP status code (e.g., res.status(200)).
 * - res.send(body): Sends a response body (e.g., text, HTML, or JSON).
 * - res.json(obj): Sends a JSON response.
 * - res.render(view, locals): Renders a view template and sends the HTML as the response.
 * - res.redirect(url): Redirects the client to a different URL.
 * - res.cookie(name, value, options): Sets a cookie in the response.
 * @param {*} next If your middleware or route handler doesn't end the request-response cycle (i.e., it doesn't send a response), you need to call next() to pass control to the next middleware function.
 */
const travel = async function(req, res, next) {
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = '';
            if (!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                if (!json.length) {
                    message = 'No trips exist in our database';
                }
            }
            res.render('travel', {title: 'Travlr Getaways', trips: json, message});
        })
        .catch(err => res.status(500).send(err.message));
};


module.exports = {
    travel
};