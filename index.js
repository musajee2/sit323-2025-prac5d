const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Addition endpoint
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Invalid parameters. num1 and num2 must be numbers.' });
    }

    res.json({ result: num1 + num2 });
});

// Subtraction endpoint
app.get('/subtract', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Invalid parameters. num1 and num2 must be numbers.' });
    }

    res.json({ result: num1 - num2 });
});

// Multiplication endpoint
app.get('/multiply', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Invalid parameters. num1 and num2 must be numbers.' });
    }

    res.json({ result: num1 * num2 });
});

// Division endpoint
app.get('/divide', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Invalid parameters. num1 and num2 must be numbers.' });
    }

    if (num2 === 0) {
        return res.status(400).json({ error: 'Cannot divide by zero.' });
    }

    res.json({ result: num1 / num2 });
});

// Default route
app.get('/', (req, res) => {
    res.send('Simple Calculator Microservice is running.');
});

// Start the server
app.listen(port, () => {
    console.log(`Calculator Microservice listening on port ${port}`);
});
