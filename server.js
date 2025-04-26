const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/patientSurvey', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Define a schema for the survey data
const surveySchema = new mongoose.Schema({
    patientName: String,
    fileNumber: String,
    hospitalUnit: String,
    treatmentSatisfaction: String,
    facilitiesSatisfaction: String,
    comments: String,
});

// Create a model for the survey data
const Survey = mongoose.model('Survey', surveySchema);

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Patient Satisfaction Survey API');
});

// API endpoint to handle form submission
app.post('/submit-form', async (req, res) => {
    try {
        const surveyData = new Survey(req.body);
        await surveyData.save();
        res.status(200).send('Form data saved successfully');
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).send('Error saving form data');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});