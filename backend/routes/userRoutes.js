const express = require('express');
const router = express.Router();
const user = require('../models/Users');
const bcrypt = require('bcrypt');

// Ruta para registrar usuario
router.post('/register', async (req, res) => {
    try {
        const { name, lastname, username, email, password } = req.body;

        if (!name || !lastname || !username || !email || !password) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Verificar si el username ya está en uso
        const existingUser = await user.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario en la base de datos
        const newUser = await user.create({ 
            name, 
            lastname, 
            username, 
            email, 
            password: hashedPassword 
        });

        res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });

    } catch (error) {
        console.error('❌ Error en el servidor:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});


module.exports = router;
