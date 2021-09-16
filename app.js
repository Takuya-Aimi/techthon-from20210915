const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./api/routes');
routes(app);

app.listen(port);
console.log(`API Server started on: ${port}`);
