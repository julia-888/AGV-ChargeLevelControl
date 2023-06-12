-- Table: public.ChargingStations

-- DROP TABLE IF EXISTS public."ChargingStations";

CREATE TABLE IF NOT EXISTS public."ChargingStations"
(
    "idOfChargingStation" integer NOT NULL,
    x integer NOT NULL,
    y integer NOT NULL,
    status boolean,
    level integer,
    CONSTRAINT "ChargingStations_pkey" PRIMARY KEY ("idOfChargingStation")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."ChargingStations"
    OWNER to postgres;