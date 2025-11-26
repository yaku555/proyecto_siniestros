// Carga las variables de entorno desde un archivo .env (por ejemplo, MONGO_URI, PORT, etc.)
require('dotenv').config();

// Se importa el framework Express para crear la aplicación web.
const express = require('express');

// Se importa 'morgan', un middleware para registrar las solicitudes HTTP.
const morgan = require('morgan');

// Se importa 'mongoose', la librería para interactuar con MongoDB.
const mongoose = require('mongoose');


const cors =  require('cors');
// Se importan las rutas correspondientes para cada recurso de la API.
const usuarioRoutes = require('./routes/usuario.routes.js');
const vehiculoRoutes = require('./routes/vehiculo.routes.js');
const denuncioRoutes = require('./routes/denuncio.routes.js');
const siniestroRoutes = require('./routes/siniestro.routes.js');
const tallerRoutes = require('./routes/taller.routes.js');
const gruaRoutes = require('./routes/grua.routes.js');
const authRoutes = require('./routes/auth.routes');

// Se importan middlewares para manejar errores y solicitudes no encontradas.
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

// Se crea una instancia de la aplicación Express.
const app = express();

// Se establece el puerto del servidor. Si no está configurado en las variables de entorno, se usa el puerto 3000.
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173' // Reemplaza con el origen de tu frontend
}))
app.use(morgan('dev'));               // Usar 'morgan' para registrar las solicitudes HTTP en el log.
app.use(express.json());              // Middleware para analizar las solicitudes con contenido JSON.

// Rutas: Se definen las rutas principales para cada entidad de la API.
app.use('/api/usuarios', usuarioRoutes);    // Ruta para manejar operaciones de usuarios.
app.use('/api/vehiculos', vehiculoRoutes); // Ruta para manejar operaciones de vehículos.
app.use('/api/denuncios', denuncioRoutes); // Ruta para manejar operaciones de denuncios.
app.use('/api/siniestros', siniestroRoutes); // Ruta para manejar operaciones de siniestros.
app.use('/api/talleres', tallerRoutes);    // Ruta para manejar operaciones de talleres.
app.use('/api/gruas', gruaRoutes);        // Ruta para manejar operaciones de grúas.
app.use('/api/auth', authRoutes);

// Middleware para manejar rutas no encontradas (404).
app.use(notFound);

// Middleware para manejar errores generales de la aplicación.
app.use(errorHandler);

// Conexión a la base de datos MongoDB utilizando la URI de conexión almacenada en el archivo .env.
mongoose
  .connect(process.env.MONGO_URI) // Usando la URI de MongoDB desde las variables de entorno.
  .then(() => {
    console.log('✅ MongoDB conectado'); // Mensaje de éxito al conectar con MongoDB.
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`); // Inicia el servidor en el puerto configurado.
    });
  })
  .catch((err) => {
    console.error('❌ Error al conectar a MongoDB:', err.message); // Mensaje de error si la conexión falla.
  });

