const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "6059",
    database: "database",
    host: "localhost",
    port: 3060,
    schema: "public",
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));


//  GET
app.get('/', async (req, res) => {
    try{
        res.send("Hello!");
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/AGVs', async (req, res) => {
    try{
        const response = await pool.query(`SELECT * FROM public."AGVs" ORDER BY "idOfAGV"`);
        console.log(res.json(response.rows));
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/ChargingStations', async (req, res) => {
    try{
        const response = await pool.query(`SELECT * FROM public."ChargingStations" ORDER BY "idOfChargingStation"`);
        console.log(res.json(response.rows));
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/Tasks', async (req, res) => {
    try{
        const response = await pool.query(`SELECT * FROM public."Tasks"`);
        console.log(res.json(response.rows));
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//  UPDATE
app.put('/AGVs', async (req, res) => {
    try {
        for (i=0; i < 15; i++){
            const AGVsUpdate = await pool.query(
                `UPDATE public."AGVs" SET "chargeLevel" = "chargeLevel"-$1 WHERE "idOfAGV" = $2`,
                [req.body.dataForSending[i].level, req.body.dataForSending[i].id]);
        }
        
        const response = await pool.query(`SELECT * FROM public."AGVs" ORDER BY "idOfAGV"`);
        res.json(response.rows);
    } catch (err) {
        console.error(err.message)
    }
})



app.listen(5000, () => {
    console.log("Server is listening on port 5000");
})