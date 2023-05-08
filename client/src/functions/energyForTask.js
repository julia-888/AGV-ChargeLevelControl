export const energyForTask = function(distance, distanceWithCargo, cargo) {
    const S_ = 7.14; //длина суммарного пути разгона и торможения при максимальной скорости
    const a = 0.3; //ускорение погрузчика
    const AGVWeight = 3140; //масса погрузчика без груза
    let En = 0;

    //расчёт энергии на путь к точке взятия груза
    while (distance >= S_) {
        En += 24.5 * AGVWeight;
        distance -= S_;
    }

    En = En + (AGVWeight/2)*(distance*a)*(distance*a);

    //расчёт энергии на путь к точке назначения
    while (distanceWithCargo >= S_) {
        En += 24.5 * (AGVWeight + cargo);
        distanceWithCargo -= S_;
    }

    En = En + ((AGVWeight + cargo)/2)*(distanceWithCargo*a)*(distanceWithCargo*a);

    return En;
}