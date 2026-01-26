const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// const { createClient } = require('@supabase/supabase-js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Apli Mumbai Rail API is Running');
});

// Import Routes
const transportRoutes = require('./routes/transportRoutes');
const scanRoutes = require('./routes/scanRoutes');

// Mount Routes
app.use('/api', transportRoutes); // Handles /api/trains, /api/crowd
app.use('/api/scan', scanRoutes); // Handles /api/scan

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
