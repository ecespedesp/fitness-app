const express = require('express');
const router = express.Router();
const connection = require('./db');

// Ruta para registrar un usuario
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';

    connection.query(query, [username, password], (err, result) => {
        if (err) {
            console.error('Error al registrar usuario: ' + err.stack);
            return res.status(500).send('Error al registrar usuario');
        }
        res.status(200).send('Usuario registrado con éxito');
    });
});
