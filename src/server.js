require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./api/router');

const app = express();

app.use(cors());
app.use(express.json());

const port = 3000

app.use('/message-service', router);
app.listen(port, function() {
    console.log(`rest api running on port ${port}`);
})