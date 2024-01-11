import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Configuração do CORS
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

// Configuração do PostgreSQL
const db = new pg.Client({
    user: 'tiramisu',
    host: 'localhost',
    database: 'world',
    password: process.env.PASSWORD,
    port: 5432,
});

async function dbConnect() {
    await db.connect();
    console.log("Connected to database");
}

dbConnect();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Rota para obter todos os países
app.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM world");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao obter países");
    }
});

// Rota para obter um país aleatório
app.get("/api/getCountry", async (req: Request, res: Response) => {
    try {
        const result = await db.query("SELECT * FROM world ORDER BY RANDOM() LIMIT 1");
        console.log(result.rows)
        const randomCountry = result.rows[0];
        res.json(randomCountry);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao obter país aleatório");
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
