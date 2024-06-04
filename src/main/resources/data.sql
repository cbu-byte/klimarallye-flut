/*DROP TABLE IF EXISTS buildings;
CREATE TABLE IF NOT EXISTS buildings(
    id identity PRIMARY KEY,
    name varchar(50) NOT NULL,
    level integer NOT NUll,
    maxWaterlevel integer NOT NULL,
    cost integer NOT NULL,
    hp integer NOT NULL,
    image BLOB,
);*/

/* Biberdamm Level 1 */
INSERT INTO
    buildings(id, name, level, maxWaterlevel, cost, hp)
VALUES
    (1, 'Biberdamm', 1, 4, 1000, 100);

INSERT INTO
    buildings(id, name, level, maxWaterlevel, cost, hp)
VALUES
    (2, 'Biberdamm', 2, 5, 1200, 150);

INSERT INTO
    buildings(id, name, level, maxWaterlevel, cost, hp)
VALUES
    (3, 'Sandsack', 2, 5, 1200, 150);

INSERT INTO
    buildings(id, name, level, maxWaterlevel, cost, hp)
VALUES
    (4, 'Staudamm', 2, 5, 1200, 150);

INSERT INTO
    buildings(id, name, level, maxWaterlevel, cost, hp)
VALUES
    (5, 'Begradigung', 2, 5, 1200, 150);

INSERT INTO
    buildings(id, name, level, maxWaterlevel, cost, hp)
VALUES
    (6, 'Renaturierung', 2, 5, 1200, 150);

INSERT INTO
    buildings(id, name, level, maxWaterlevel, cost, hp)
VALUES
    (7, 'Deich', 2, 5, 1200, 150);

INSERT INTO
    buildings(id, name, level, maxWaterlevel, cost, hp)
VALUES
    (8, 'Rueckhaltebecken', 2, 5, 1200, 150);

/*
CREATE TABLE IF NOT EXISTS maps(
    id identity PRIMARY KEY,
    name varchar(50) NOT NULL,
    mapSectionNumber integer NOT NUll, /* Map abschnitt*/
    Waterlevel integer NOT NULL,
    currentWave integer NOT NULL,
    image BLOB,
);*/