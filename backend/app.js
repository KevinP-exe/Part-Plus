import express from "express";
import swaggerUi from "swagger-ui-express"
import clientsRoute from "./src/routes/clientsRoute.js"
import reservationsRoute from "./src/routes/reservationsRoute.js"

const app = express();

app.use(express.json());

const swaggerDocument = JSON parse(
    fs.readFileSync(path.resolve("./kevshito-PartPlus-1.0.0-resolved.json"), "utf-8")
); 

app.use ("api/docs".swaggerUi.serve.swaggerUi.setup(swaggerDocument));
app.use("/api/clients", clientsRoute);
app.use("/api/reservations", reservationsRoute);

export default app;