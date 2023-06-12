/* Добавление задачи в таблицу (вручную) */

INSERT INTO public."Tasks" ("idOfTask",
							"targetX", "targetY", "distanceToFinish",
							"weight",
							"performingNow", "fromX", "fromY", "idOfAGVPerforming",
							"completed", "distanceToStart")
							VALUES
							(68,
							200, 10, 485,
							180,
							false, 1, 7, 1,
							false, 450);
							
							