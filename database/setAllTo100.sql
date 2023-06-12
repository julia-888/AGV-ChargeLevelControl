/* Обнуляющий скрипт для тестовых данных */

UPDATE public."AGVs" SET "chargeLevel" = 100;
UPDATE public."AGVs" SET "status" = true;
UPDATE public."AGVs" SET "idOfStationConnected" = null;
UPDATE public."ChargingStations" SET "status" = true;
UPDATE public."Tasks" SET "completed" = false;
UPDATE public."ChargingStations" SET "level" = null;

/* проверить idOfAGVPerforming перед стартом 
	последовательность: 1, 2, 3, 4, 2, 3, 5, 1, 7, 8, 10, 9, 11, 12, 4, 3, 2, 
	14, 15, 4, 1, 2, 3, 4, 1, 2, 9, 10, 11, 12, 2, 3, 2, 15, 2, 15, 2, 13, 4, 
	!2, !2, 3, 7, 5, 7, 3, 8, 7, 8, 4, 3, 7, !3, 4, 1, 7, !2, 7,
	!3, 4, !1, !7, !1, 4, !7, !1, !3, 1 */
	
	/* точки: 40, 41, (53), 57,
			  59, (61), 62, 63, 65, 66, 67*/