const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 🛠️ API Endpoint for Apple Shortcuts
app.post('/api/send-message', async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).send('Text is required');

    try {
        await axios.post(WEBHOOK_URL, { text });
        res.json({ success: true, message: 'Message sent to Google Chat!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
});

// 🖥️ Homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// 🚀 Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
