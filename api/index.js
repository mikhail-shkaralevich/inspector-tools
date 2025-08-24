const express = require('express');
const {Pool}  = require('pg');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Updated in prod.
const allowedOrigins = [
    'http://localhost:8080',
    'https://www.your-production-domain.com', // Your future website
    'file:///C:/Users/mkara/Documents/CodingProjects/inspector-tools/ui/index.html'
]

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not Allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));
app.use(express.json());

// Pool manages multiple connections.
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'inspector-tools-db',
    password: '3531C45499',
    port: 5432,
});

/**
 * Middleware to verify JWT token.
 */
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract JWT token.

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided. '});
    }

    try {
        const decoded = jwt.verify(token, 'MY_JWT_SECRET');
        req.user = decoded; // Add decoded user payload to the request object.
        next(); // Proceed to the next middleware or route handler.
    }
}

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

app.post('/api/questions', async (req, res) => {
    try {
        const { program, question_text, options, correct_answer } = req.body;

        if (!program || !question_text || !options || !correct_answer) {
            return res.status(400).json({error: 'program, question_text, options and correct_answer fields are required!'});
        }

        // Query with placeholder to prevent SQL injection.
        const newQuestionQuery = `
            INSERT INTO questions (program, question_text, options, correct_answer)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;

        const values =  [program, question_text, JSON.stringify(options), correct_answer];

        // Execute the query.
        const result = await pool.query(newQuestionQuery, values);

        // Send back the newly added question.
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try { // Find admin in the database;
        const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
        const admin = result.rows[0];

        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare provided password with the stored hash.
        const isMatch = await bcrypt.compare(password, admin.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // If credentials are correct - create a JWT.
        const payload = { id: admin.id, username: admin.username };
        const token = jwt.sign(
            payload,
            "MY_JWT_TOKEN", // IMPORTANT: use an environmnet variable in prod.
            { expiresIn: '1h' } 
        );

        res.json({ token });
    } catch (err) {
        console.err(err);
        res.status(500).send('Server Error');
    }
});

app.delete('/api/questions/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const deleteQuery = `DELETE FROM questions WHERE id = $1 RETURNING *;`;
        const result = await pool.query(deleteQuery, [id]);

        // Check if the row was actually deleted.
        if (result.rowCount === 0) {
            return res.status(404).json({error: 'Question not found.'});
        }
        res.status(200).json({ message: 'Question deleted successfully.', deletedQuestion: result.rows[0]});

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error.');
    }
});


app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
})