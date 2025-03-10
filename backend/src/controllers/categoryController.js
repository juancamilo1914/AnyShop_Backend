const Category = require("../models/Category");

const createCategory = async (req, res) => {
    try {
      const { name, description, imageUrl } = req.body;
  
      if (!name || !description || !imageUrl) {
        return res.status(400).json({ error: "Nombre, descripción e imagen son obligatorios" });
      }
  
      const newCategory = await Category.create({ name, description, imageUrl });
  
      return res.status(201).json({ message: "Categoría creada con éxito", category: newCategory });
    } catch (error) {
      console.error("❌ Error al crear la categoría:", error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  };
  

module.exports = { createCategory };
