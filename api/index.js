const express = require('express');
const {Pool}  = require('pg');

const app = express();
const PORT = 3000;

const allowedOrigins = [
    'http://localhost:8080',
    'https://www.your-production-domain.com', // Your future website
    'file:///C:/Users/mkara/Documents/CodingProjects/inspector-tools/ui/index.html'
]

// Pool manages multiple connections.
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'inspector-tools-db',
    password: '3531C45499',
    port: 5432,
});

app.get('/',  (req, res) => {
    res.send("Hello from the backend!");
});

app.get('/api/questions', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM questions');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
})