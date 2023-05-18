const axios = require('axios');
// const axios = a();
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
app.get("/", async (req, res) => {
    try{
        const article = { title: 'Axios POST Request Example' };
        await axios.post('http://localhost:5001/charging', {article}).then(response => res.send(response.data)).catch(err => console.log(err));
    
    } catch (err) {
        console.error(err.message);
    }
})

app.get('/routeManagement', async (req, res) => {
    try{
        await axios.get("http://localhost:5001/").then(data => { res.send(data.data); });        
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
        const response = await pool.query(`SELECT * FROM public."Tasks" WHERE "completed" != true AND "startTime" = (
            SELECT "startTime" FROM public."Tasks" WHERE completed = false ORDER BY "idOfTask" LIMIT 1) ORDER BY "idOfTask"`);
        console.log(res.json(response.rows));
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});


var munkres = require('munkres-js'); //используется реализованная 

const stationChoice = (dischargedIds) => { //по горизонтали погрузчики, по вертикали станции
    const matrix = [];
    for (let i=0; i < dischargedIds.length; i++) {
        matrix.push(dischargedIds[i].costs);
    }

   return munkres(matrix);
}

//  UPDATE
app.put('/AGVs', async (req, res) => {
    try {
        const dischargedIds = []; //массив, хранящий id погрузчиков, требующих зарядки
        
        for (let i=0; i < req.body.dataForSending.length; i++){
            if (req.body.dataForSending[i].level === null) { //если уровень null, то добавляется объект
                dischargedIds.push({
                    id: req.body.dataForSending[i].id,
                    costs : [1, 1, 1, 1, 1, 1],    //ПОМЕНЯЯЯЯЯЯЯЯЯЯЯТЬ!!!!!!!!!!!!!!
                });
            }
            else { //обработка данных для неразряженных погрузчиков
                const AGVsUpdate = await pool.query(
                    `UPDATE public."AGVs" SET "chargeLevel" = "chargeLevel"-$1 WHERE "idOfAGV" = $2`,
                    [req.body.dataForSending[i].level, req.body.dataForSending[i].id]);
                
                const TasksUpdate = await pool.query(
                    `UPDATE public."Tasks" SET "completed" = true WHERE "idOfTask" = $1`,
                    [req.body.dataForSending[i].taskId]);
            }
        }

        const choosedStations = stationChoice(dischargedIds); //результаты распределения
        ////////////////////////
        
        const response1 = await pool.query(`SELECT * FROM public."AGVs" ORDER BY "idOfAGV"`);
        const response2 = await pool.query(`SELECT * FROM public."Tasks" WHERE "completed" != true AND "startTime" = (
                                            SELECT "startTime" FROM public."Tasks" WHERE completed = false ORDER BY "idOfTask" LIMIT 1)`);
        
        res.json({AGVs: response1.rows, tasks: response2.rows});
    } catch (err) {
        console.error(err.message)
    }
})



app.listen(5000, () => {
    console.log("Server is listening on port 5000");
})