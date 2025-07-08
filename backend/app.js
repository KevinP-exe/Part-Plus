import express from "express";
import clientsRoute from "./src/routes/clientsRoute.js"
import reservationsRoute from "./src/routes/reservationsRoute.js"

const app = express();

app.use(express.json());

app.use("/api/clients", clientsRoute);
app.use("/api/reservations", reservationsRoute);

export default app;