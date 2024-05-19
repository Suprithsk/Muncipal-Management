const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB',process.env.MONGO_URL);
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});