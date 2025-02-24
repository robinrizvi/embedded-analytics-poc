-- Generated through https://tableconvert.com/excel-to-sql#google_vignette
CREATE TABLE client
(
    ClientID	INT,
    Company	VARCHAR(512),
    Country	VARCHAR(512),
    State	VARCHAR(512),
    City	VARCHAR(512),
    Street	VARCHAR(512)
);
CREATE TABLE salesrep
(
    SalesRepID  VARCHAR(512),
    SalesRep    VARCHAR(512),
    SalesRegion VARCHAR(512)
);
CREATE TABLE salesregion
(
    SalesRegion VARCHAR(512),
    State   VARCHAR(512),
    Latitude    DOUBLE,
    Longitude   DOUBLE
);
CREATE TABLE revenue
(
    ClientID    INT,
    ProductID   INT,
    OrderId VARCHAR(512),
    Revenue INT,
    SalesDate   VARCHAR(512)
);

CREATE TABLE product
(
    ProductID   INT,
    ProductName VARCHAR(512),
    Category    VARCHAR(512),
    Released    INT
);

CREATE TABLE nps
(
    Name	VARCHAR(512),
    Date	VARCHAR(512),
    State	VARCHAR(512),
    NPS	INT
);