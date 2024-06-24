const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const adminRoutes=require('./routes/adminRoutes');
const userRoutes=require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());
require('dotenv').config();

app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allow all methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow all headers
}));


app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB',process.env.MONGO_URL);
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});