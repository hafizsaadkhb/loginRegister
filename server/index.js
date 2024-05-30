const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;

// Database connection
const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12709623',
    password: '8McyGHFMaW',
    database: 'sql12709623'
});

try{
    db.connect((err) => {
        if (err) {
            console.log(err);
        }
        console.log('MySQL Connected...');
    });
} catch (err){
    console.log(err);
}

// Middleware
app.use(cors({
    origin: 'https://login-register-silk.vercel.app', // Replace with your React app's URL
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Set secure to true if using HTTPS
}));

// Routes
app.post('/register', (req, res) => {
    const { username, name, password, address, phone, email, designation, department } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error('Bcrypt hashing error:', err);
            return res.status(500).send('Internal server error');
        }

        const sql = 'INSERT INTO users (username, name, password, address, phone, email, designation, department) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [username, name, hash, address, phone, email, designation, department], (err, result) => {
            if (err) {
                console.error('Database insertion error:', err);
                return res.status(500).send('Username already exists');
            }
            res.status(200).send('User registered successfully');
        });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Internal server error');
        }

        if (results.length === 0) {
            return res.status(400).send('User not found');
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, match) => {
            if (err) {
                console.error('Bcrypt comparison error:', err);
                return res.status(500).send('Internal server error');
            }

            if (match) {
                req.session.username = username;
                return res.status(200).send('Login successful');
            } else {
                return res.status(400).send('Incorrect password');
            }
        });
    });
});

// app.post('/login', (req, res) => {
//     const { username, password } = req.body; 
//     const sql = 'SELECT * FROM users WHERE username = ?';
//     db.query(sql, [username], (err, results) => {

//         if (err) {
//             console.error('Database query error:', err);
//             return res.status(500).send('Internal server error');
//         }
        
//         // if (username===results[0].username) {
//         //     return res.status(200).send('User found');
//         // }
//         // else if (username !== results[0].username) {
//         //     return res.status(200).send('User not found');
//         // }
//         if (results.length === 0) {
//             return res.status(200).send('User not found');
//         }
//         if (results.length === 1) {
//             const user = results[0]; // Assuming username is unique, use the first result
//             bcrypt.compare(password, user.password, (err, match) => {
//                 if (err) {
//                     console.error('Bcrypt comparison error:', err);
//                     return res.status(500).send('Internal server error');
//                 }
//                 if (match) {
//                     // req.session.username = username;
//                     // return res.redirect('/dashboard');
//                     return res.status(200).send('password matched')
//                 } else {
//                     return res.status(200).send('Incorrect password');
//                 }
//             });
//             // return res.status(200).send('User found' + results[0].username);
//         }
        
       
//     });
// });


app.get('/dashboard', (req, res) => {
    if (req.session.username) {
        res.send(`Hello, ${req.session.username}!`);
    } else {
        res.redirect('/login.html');
    }
});

app.get('/getData', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send(results);
        } else {
            res.send('User not found');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });