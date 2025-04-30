const express = require("express");
const app = express();
require("dotenv").config();

console.log('DB_USER:', process.env.DB_USER);

const taskRoutes = require("./routes/taskRoutes");

app.use(express.json());// Para aceitar JSON
app.use("/api", taskRoutes); // Rota base

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
