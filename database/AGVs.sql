-- Table: public.AGVs

-- DROP TABLE IF EXISTS public."AGVs";

CREATE TABLE IF NOT EXISTS public."AGVs"
(
    "idOfAGV" integer NOT NULL,
    x integer NOT NULL,
    y integer NOT NULL,
    "chargeLevel" integer,
    status boolean,
    "idOfStationConnected" integer,
    CONSTRAINT "AGV_pkey" PRIMARY KEY ("idOfAGV"),
    CONSTRAINT "fk_idOfStationConnected" FOREIGN KEY ("idOfStationConnected")
        REFERENCES public."ChargingStations" ("idOfChargingStation") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."AGVs"
    OWNER to postgres;