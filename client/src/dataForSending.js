// данные о том на сколько уменьшается заряд каждого погрузчика после выполнения операции

export let dataForSending = [];

// export const dataForSending = [{
//     id: 1,
//     level: 0
//   }, {
//     id: 2,
//     level: 0
//   }, {
//     id: 3,
//     level: 0
//   }, {
//     id: 4,
//     level: 0
//   }, {
//     id: 5,
//     level: 0
//   }, {
//     id: 6,
//     level: 0
//   }, {
//     id: 7,
//     level: 0
//   }, {
//     id: 8,
//     level: 0
//   }, {
//     id: 9,
//     level: 0
//   }, {
//     id: 10,
//     level: 0
//   }, {
//     id: 11,
//     level: 0
//   }, {
//     id: 12,
//     level: 0
//   }, {
//     id: 13,
//     level: 0
//   }, {
//     id: 14,
//     level: 0
//   }, {
//     id: 15,
//     level: 0
//   }];

export const setDataForSending = function(id, level, taskId) {
  dataForSending.push({id: id, level: level, taskId: taskId});
}

export const removeData = function() {
  dataForSending = [];
}