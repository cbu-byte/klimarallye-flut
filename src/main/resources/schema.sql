DROP TABLE IF EXISTS buildings;
CREATE TABLE IF NOT EXISTS buildings(
    id identity PRIMARY KEY,
    name varchar(50) NOT NULL,
    level integer NOT NUll,
    maxWaterlevel integer NOT NULL,
    cost integer NOT NULL,
    hp integer NOT NULL,
    image BLOB,
);
CREATE TABLE IF NOT EXISTS maps(
    id identity PRIMARY KEY,
    name varchar(50) NOT NULL,
    mapSectionNumber integer NOT NUll, /* Map abschnitt*/
    Waterlevel integer NOT NULL,
    currentWave integer NOT NULL,
    image BLOB,
);