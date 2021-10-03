// Importing packages
const express = require('express');
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 80;
const hostName = '127.0.0.1';
const path = require('path');


// Static paths configuration
const static_path = path.join(__dirname, '../public');
app.use(express.static(static_path));



// Views related configuration
const view_path = path.join(__dirname, '../views');
app.set('view engine', 'hbs');
app.set('views', view_path);



// Partials configuration
const partial_path = path.join(__dirname, '../partials');
hbs.registerPartials(partial_path);

// Paramters

let errorMsg = {
    message: "OOPS! You have landed to a wrong page!"
}


// Setting the end points

app.get('/', (req, res) => {
    res.status(200).render('index');
})

app.get('/about', (req, res) => {
    res.status(200).render('about');
})

app.get('/weather', (req, res) => {
    res.status(200).render('weather');
})

app.get('*', (req, res) => {
    res.status(404).render('404', errorMsg);
})






// Listening the server
app.listen(port, hostName, () => {
    console.log(`The server has started at http://${hostName}:${port}`);
})