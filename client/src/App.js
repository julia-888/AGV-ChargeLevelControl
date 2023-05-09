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
        // console.log(data.data);
      });

    axios
      .get("http://localhost:5000/AGVs")
      .then(data => {
        setAGVs(data.data);
        // console.log(data.data);
      });

    axios
      .get("http://localhost:5000/ChargingStations")
      .then(data => {
        setChargingStations(data.data);
        // console.log(data.data);
      });

  }, []);

  function handleClick() {
    const time = tasks[0].startTime;
    
    for (let i = 0; i < tasks.length; i=i+1 ) {
      const energy = energyForTask(tasks[i].distanceToStart, tasks[i].distanceToFinish, tasks[i].weight);
      
      //проверка достаточно ли энергии для выполнения задачи, если да, то заполнение поля level соответствующим значением, если нет, то null
      energyIsEnough(energy, AGVs[tasks[i].idOfAGVPerforming-1].chargeLevel) ? 
        setDataForSending(tasks[i].idOfAGVPerforming, energyToPercents(energy), i+1) : 
        setDataForSending(tasks[i].idOfAGVPerforming, null);
      if (tasks[i+1].startTime != time) {
        break;
      }

    }

    axios
      .put("http://localhost:5000/AGVs", {dataForSending}).then(data => console.log(data.data));

    removeData();
    
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
          <BatteryLevel completed={agv.chargeLevel} id={agv.idOfAGV}  />
        );
      })}

      <h3>Зарядные станции</h3>
      <ChargingWrap>
      {chargingStations.map(chargingStation => {
        return(
          <ChargingStation id={chargingStation.idOfChargingStation} status={chargingStation.status}/>
        );
      })}
      </ChargingWrap>

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

const ChargingWrap = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  margin: 30px 0 80px 0;
`


export default App;
