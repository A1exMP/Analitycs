const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors()); 

// Si además quieres permitir todos los headers y métodos explícitamente:
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());

app.post("/collect", (req, res) => {
  console.log(" Payload recibido:", req.body);
  res.status(200).json({ ok: "Recibido" });
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));