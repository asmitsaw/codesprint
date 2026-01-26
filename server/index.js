const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// const { createClient } = require('@supabase/supabase-js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Dummy Routes for now
app.get('/', (req, res) => {
    res.send('Apli Mumbai Rail API is Running');
});

// Crowd Data Endpoint (Serving the same logic as frontend for now, or could proceed to be real source)
app.get('/api/crowd-status', (req, res) => {
    const services = [
        { id: 1, name: "Fast Local", time: "10:15", route: "Churchgate - Virar", platform: 3, crowdLevel: "High", occupancy: 92 },
        { id: 2, name: "Slow Local", time: "10:22", route: "Churchgate - Borivali", platform: 1, crowdLevel: "Medium", occupancy: 65 },
        { id: 3, name: "AC Local", time: "10:45", route: "Churchgate - Virar", platform: 4, crowdLevel: "Low", occupancy: 42 },
        { id: 4, name: "Metro Line 3", time: "10:10", route: "Cuffe Parade - SEEPZ", platform: 2, crowdLevel: "Medium", occupancy: 58 },
    ];
    res.json(services);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
