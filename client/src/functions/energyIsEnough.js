import { energyForTask } from "./energyForTask";

export const energyIsEnough = function(distance, distanceWithCargo, cargo, currentChargeLevel) {
    let En = energyForTask(distance, distanceWithCargo, cargo); //расчёт энергии для задачи

    //сравнение необходимой и оставшейся энергий и возврат результата
    const EOfAGV = 803520 * currentChargeLevel;

    return EOfAGV - En <= 16070400 ? false : true;
}