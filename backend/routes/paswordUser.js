const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/Users'); // Asegúrate de que el modelo esté bien importado

// 🔒 Ruta para cambiar la contraseña
router.put('/change-password/:id', async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.params.id;

        // Verificar si el usuario existe
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verificar que la contraseña actual sea correcta
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'La contraseña actual es incorrecta' });
        }

        // Encriptar la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña en la base de datos
        await user.update({ password: hashedPassword });

        return res.status(200).json({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
        console.error('❌ Error al cambiar la contraseña:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;
