const bcrypt = require('bcrypt');
const User = require('../models/Users');

const loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Validaciones
      if (!email || !password) {
          return res.status(400).json({ error: 'El email y la contraseña son obligatorios' });
      }

      // Buscar el usuario solo con email y password
      const user = await User.findOne({ 
          where: { email }, 
          attributes: ['email', 'password'] // Solo traer email y password
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
      }

      return res.status(200).json({ message: 'Inicio de sesión exitoso' });

  } catch (error) {
      console.error('❌ Error en el servidor:', error);
      res.status(500).json({ error: 'Error en el servidor' });
  }
};


// Registrar un nuevo usuario
const registerUser = async (req, res) => {
    try {
        const { name, lastname, username, email, password } = req.body;

        // Validaciones iniciales
        if (!name || !lastname || !username || !email || !password) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Verificar si el username ya está en uso
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
        }

        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ error: 'El correo ya está en uso' });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario en la base de datos
        const newUser = await User.create({ 
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
};

// Cambiar contraseña de usuario
const changePassword = async (req, res) => {
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
};

module.exports = { registerUser, changePassword, loginUser };
