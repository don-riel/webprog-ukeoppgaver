CREATE TABLE Motorvogn
(
    id INTEGER AUTO_INCREMENT NOT NULL,
    personnr VARCHAR (255) NOT NULL,
    navn VARCHAR (255) NOT NULL,
    addresse VARCHAR (255) NOT NULL,
    kjennetegn VARCHAR (255) NOT NULL,
    bilmerke VARCHAR (255) NOT NULL,
    biltype VARCHAR (255) NOT NULL,
    PRIMARY KEY (id)
);