//функция перевода энергии в джоулях в проценты заряда

export const energyToPercents = function(energy) {
    return Math.ceil(energy / 803520);
}