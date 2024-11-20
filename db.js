const mysql = require('mysql2');

// Configuración de la conexión con la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fitness_app'  // Nombre correcto de la base de datos
  });

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.stack);
    return;
  }
  console.log('Conexión a la base de datos establecida.');
});

module.exports = connection;
