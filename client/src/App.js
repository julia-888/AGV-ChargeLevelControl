import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import BatteryLevel from './BatteryLevel';
import ChargingStation from './ChargingStation';
import axios from 'axios';
import styled from 'styled-components';
import { dataForSending, removeData } from './dataForSending';
import { setDataForSending } from './dataForSending';
import { energyForTask } from './functions/energyForTask';
import { energyIsEnough } from './functions/energyIsEnough';
import { energyToPercents } from './functions/energyToPercents';

function App() {
  //массивы данных
  const [AGVs, setAGVs] = useState([]);
  const [chargingStations, setChargingStations] = useState([]);
  const [tasks, setTasks] = useState([]);

  //get-запросы
  useEffect(() => {
    axios
      .get("http://localhost:5000/Tasks")
      .then(data => {
        setTasks(data.data);
      });

    axios
      .get("http://localhost:5000/AGVs")
      .then(data => {
        setAGVs(data.data);
      });

    axios
      .get("http://localhost:5000/ChargingStations")
      .then(data => {
        setChargingStations(data.data);
      });

  }, []);


  function findAGVById(id) {
    let agv = {};
    for (let i = 0; i < AGVs.length; i ++) {
      if (AGVs[i].idOfAGV == id) {
        agv = AGVs[i];
        break;
      }
    }
    return agv;
  }

  function handleClick() {
    tasks.map(task => {
      const energy = energyForTask(task.distanceToStart, task.distanceToFinish, task.weight);
      
      //проверка достаточно ли энергии для выполнения задачи, если да, то заполнение поля level соответствующим значением, если нет, то null
      energyIsEnough(energy, findAGVById(task.idOfAGVPerforming).chargeLevel) ? 
        setDataForSending(task.idOfAGVPerforming, energyToPercents(energy), task.idOfTask) : 
        setDataForSending(task.idOfAGVPerforming, null, task.idOfTask);
    })
    
    console.log(dataForSending);

    axios
      .put("http://localhost:5000/AGVs", {dataForSending})
      .then(data => { setAGVs(data.data.AGVs); setChargingStations(data.data.chargingStations); setTasks(data.data.tasks); });
      
    removeData();

    console.log(chargingStations);
    console.log(AGVs);
  }
  

  return (
    <div className="App">
      <h1>Контроль и управление зарядом погрузчиков</h1>

      <Execute onClick={handleClick}>
        Выполнить
      </Execute>

      <h3>Погрузчики</h3>
      {AGVs.map(agv => {
        return(
          <BatteryLevel completed={agv.chargeLevel} id={agv.idOfAGV} status={agv.status} idOfStationConnected={agv.idOfStationConnected}/>
        );
      })}

      <h3>Зарядные станции</h3>
      <div>
      {chargingStations.map(chargingStation => {
        return(
          <ChargingStation id={chargingStation.idOfChargingStation} status={chargingStation.status}/>
        );
      })}
      </div>
    </div>
  );
}

const Execute = styled.div`
  padding: 10px;
  width: 80px;
  margin: 30px;
  background-color: honeydew;
  border: solid green 1px;
  border-radius: 10px;

  cursor: pointer;
`


export default App;
