-- Table: public.Tasks

-- DROP TABLE IF EXISTS public."Tasks";

CREATE TABLE IF NOT EXISTS public."Tasks"
(
    "idOfTask" integer NOT NULL,
    "targetX" integer,
    "targetY" integer,
    "distanceToFinish" integer,
    weight integer,
    "performingNow" boolean,
    "fromX" integer,
    "fromY" integer,
    "idOfAGVPerforming" integer,
    completed boolean,
    "distanceToStart" integer,
    route int2vector[],
    "startTime" time without time zone,
    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("idOfTask"),
    CONSTRAINT "idOfAGVPerforming" FOREIGN KEY ("idOfAGVPerforming")
        REFERENCES public."AGVs" ("idOfAGV") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Tasks"
    OWNER to postgres;