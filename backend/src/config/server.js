const express = require("express");
const cors = require("cors");
const sequelize = require("./database");

const userRoutes = require("../routes/userRoutes");
const uploadRoutes = require("../routes/uploadsRoutes");
const categoryRoutes = require("../routes/categoryRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/user", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/category", categoryRoutes);

sequelize
  .sync()
  .then(() => console.log("🔄 Base de datos sincronizada"))
  .catch((err) => console.error("❌ Error al sincronizar:", err));

app.listen(PORT, () => {
  console.log(`⚡ Servidor en http://localhost:${PORT}`);
});