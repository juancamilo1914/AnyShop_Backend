const express = require('express');
const router = express.Router();
const { registerUser, loginUser, changePassword } = require('../controllers/userController');

// Ruta para registrar usuario
router.post('/register', registerUser);

// Ruta para login
router.post('/login', loginUser);

// Ruta para cambiar contraseña
router.put('/change-password/:id', changePassword);


module.exports = router;