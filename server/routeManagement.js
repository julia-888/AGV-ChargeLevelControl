//сервер подсистемы "Управление маршрутами" (имитация)

const express = require('express')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())  

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "6059",
    database: "database",
    host: "localhost",
    port: 3060,
    schema: "public",
});



app.get("/", function(req, res) {
    res.send(`<h2>Welcome to the route management module!</h2>`);
})


//функция расчёта стоимостей подъезда к зарядной станции
const countCosts = (idOfAGV) => {
    const costs = [];
    for (i = 0; i < 6; i++) {
        costs.push(Math.round(Math.random() * (30 - 8) + 8));
    }
    return costs;
    //функция должна строить маршрут и оценивать стоимость в зависимости от его длины и наличия пересечений с другими

    /******* P.S., это задача подсистемы "Управление маршрутами". В данной работе рассматривается только подсистема 
             "Управление зарядом" и её взаимодействие с подсистемой "Управление маршрутами". Поэтому, для наглядности,
             оригинальная функция, со всеми необходимыми расчётами заменена на рандомный выбор *******/
}

//функция нахождения нового погрузчика
const replaceAGVForTask = (taskID) => {

}


// post-запрос для расчёта стоимостей
app.post('/charging', (req, res) => { 
    let dischargedIds = req.body.dischargedIds;
    for (let i=0; i < dischargedIds.length; i++) {
        dischargedIds[i].costs = countCosts(dischargedIds[i].id)
    }
    res.send(dischargedIds);
})

// post-запрос-уведомление о выбранных в итоге маршрутах
app.post('/charging:routes', (req, res) => {
    dischargedIds = req.body.dischargedIds;
    choosed = req.body.choosedStations;
    //.... обработка данных
    res.send(`success`);
})

//put-запрос на назначение нового погрузчика на задачу
app.put('/charging:replaceAGVForTask', async (req, res) => {
    for (let i=0; i < req.body.idsOfTasksNulled.length; i++) {
        const newAGV = Math.ceil(Math.random() * (15-1) + 1); // рандомный выбор введён для имитации
        const replace = await pool.query(
            `UPDATE public."Tasks" SET "idOfAGVPerforming" = $1 WHERE "idOfTask" = $2`,
            [newAGV, req.body.idsOfTasksNulled[i]]);
    }
    res.send(`new AGV is appointed`);
})

app.listen(5001, () => {
    console.log(`Server is listening on port 5001`)
});