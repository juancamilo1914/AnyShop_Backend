const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const paswordUser = require('./routes/paswordUser')

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/user', userRoutes);
app.use('/api/user', paswordUser);

// Sincronizar Sequelize con la BD
sequelize.sync()
    .then(() => console.log('🔄 Base de datos sincronizada'))
    .catch(err => console.error('❌ Error al sincronizar:', err));

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`⚡ Servidor en http://localhost:${PORT}`);
});
