require("dotenv").config();
const express = require("express");
const app = express();
const { client } = require("./data/database");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "http://localhost";

app.use(express.json());

const cors = require("cors");
app.use(cors());

app.use("/", require("./routes"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

async function start() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on ${HOST}:${PORT}`);
        });
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
}

start();
