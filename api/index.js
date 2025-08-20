const express = require('express');

const app = express();

const PORT = 3000;

app.get('/',  (req, res) => {
    res.send("Hello from the backend!");
});

app.get('/api/questions', (req, res) => {
    const sampleQuestions = [
        { id: 1, text: "This is the first question"},
        { id: 2, text: "This is the second question"}
    ];
    res.json(sampleQuestions);
});

app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
})