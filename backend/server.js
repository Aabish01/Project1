const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Define a schema
const passionSchema = new mongoose.Schema({
    passion: {
        type: String,
        required: true,
    },
});
const emailSchema=new mongoose.Schema(
    {
      email:
      {
        type:String,
        required:true,
      }
    }
)
const Email=mongoose.model("Email",emailSchema);
// Create a model
const Passion = mongoose.model('Passion', passionSchema);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/yourdbname', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// API endpoint to handle form submission
app.post('/submit-passion', async (req, res) => {
    try {
        const newPassion = new Passion({
            passion: req.body.passion,
        });
        await newPassion.save();
        res.status(201).send('Passion submitted successfully');
    } catch (error) {
        res.status(500).send('Error submitting passion');
    }
});
app.post('/submit-email', async (req, res) => {
    try {
        const newEmail = new Email({
            email: req.body.email,
        });
        await newEmail.save();
        res.status(201).send('eamil submitted successfully');
    } catch (error) {
        res.status(500).send('Error submitting email');
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
