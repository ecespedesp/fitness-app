const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const port = 3000;

// Middleware para parsear datos JSON y formularios
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir archivos estáticos (como CSS, JS)
app.use(express.static('public'));

// Ruta principal (inicial)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Ruta de registro
app.post('/register', (req, res) => {
  const { username, password, 'confirm-password': confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.send('Las contraseñas no coinciden');
  }

  // Insertar usuario en la base de datos
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      return res.send('Error al registrar el usuario');
    }
    res.send('Usuario registrado con éxito');
  });
});

// Ruta de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verificar si el usuario existe en la base de datos
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err || results.length === 0) {
      return res.send('Credenciales inválidas');
    }
    res.send('Bienvenido, ' + username);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
