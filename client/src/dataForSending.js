// данные о том на сколько уменьшается заряд каждого погрузчика после выполнения операции

export let dataForSending = [];

export const setDataForSending = function(id, level, taskId) {
  dataForSending.push({id: id, level: level, taskId: taskId});
}

export const removeData = function() {
  dataForSending = [];
}