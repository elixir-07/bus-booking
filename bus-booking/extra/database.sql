DROP DATABASE IF EXISTS codeRed;
CREATE DATABASE codeRed;

USE codeRed;

CREATE TABLE login (
	email VARCHAR(256) NOT NULL,
    name VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL,
    id INT NOT NULL,
    PRIMARY KEY(email));

CREATE TABLE passanger (
    name VARCHAR(256) NOT NULL,
    date VARCHAR(256) NOT NULL,
    source VARCHAR(45) NOT NULL,
    destination VARCHAR(45) NOT NULL,
    bus_code VARCHAR(128) NOT NULL,
    email VARCHAR(256) NOT NULL,
    code VARCHAR(45) NOT NULL);
    
CREATE TABLE bus (
	email VARCHAR(256) NOT NULL,
    conductor VARCHAR(256),
    driver VARCHAR(256),
    bus_code VARCHAR(128) NOT NULL,
    source VARCHAR(45) NOT NULL,
    destination VARCHAR(45) NOT NULL,
    date VARCHAR(256) NOT NULL);
    
    
INSERT INTO login VALUES ('admin@gmail.com', 'admin', '$2b$10$DjKAq1BHATpZa1xaPQ6XnOaP2hdw4keh1opd1FqeET2fA.XriQ6vu', '1');


INSERT INTO login VALUES ('a1@gmail.com', 'a1', '$2b$10$PajO36nRV2o0vrUFtPGlE.eUBiITCj.3A7SEMuzPBHNaima2loWKm', '3');
INSERT INTO login VALUES ('a2@gmail.com', 'a2', '$2b$10$phz9whhOoMWYFr6l32q8EOj.jRSN2KrgodXlfdFMeGUWkZNgCkKoe', '3');
INSERT INTO login VALUES ('a3@gmail.com', 'a3', '$2b$10$lPaotVOIIccDgRi528nC6OYyNHa3c0yL6CAk9yVdPi2PArFrvDE/u', '3');
INSERT INTO login VALUES ('a4@gmail.com', 'a4', '$2b$10$Y41m7g2BOCebBCBQLyXz8uvQ7xLcISFglCc5fzOiufIpxd/X90ewy', '3');
INSERT INTO login VALUES ('a5@gmail.com', 'a5', '$2b$10$WBCCHSxoOTeUaqbc8QE3x.VG91FlZv.CR47seT05WxM7L2q2WJ4S6', '3');
INSERT INTO login VALUES ('a6@gmail.com', 'a6', '$2b$10$lLti3U/AIBh.SGDCkkSqAOADkn9.G8add.CfZdd9bkd53unPankHq', '3');
INSERT INTO login VALUES ('a7@gmail.com', 'a7', '$2b$10$Ou1SoYM0RH2ECUmXZdgcm.h/GP5XsvnsOmR5S7M7CdY2YfatIWXNa', '3');
INSERT INTO login VALUES ('a8@gmail.com', 'a8', '$2b$10$0B6l40YltMjQxnZ7WFaFn.Qwf8Ify4B0HqRjJ47xSCXvACWNTyVxm', '3');
INSERT INTO login VALUES ('a9@gmail.com', 'a9', '$2b$10$lsP4Lm3cyGd6/V/0V5duMOpE2NIrdyyVmyUx7RBRxb9WfErGSM7oS', '3');
INSERT INTO login VALUES ('a10@gmail.com', 'a10', '$2b$10$Y.BDhgfMLmLbodGK1UUk3.sRV0zpAvPG.8cDH3CGUxjTw3dlCWlE2', '3');

INSERT INTO login VALUES ('b1@gmail.com', 'b1', '$2b$10$JYvo8DcdMsi6Wnmk7uwP3O99mOXO0r9z1Ua/Cf6m.yie5qKbnOuF6', '2');
INSERT INTO login VALUES ('b2@gmail.com', 'b2', '$2b$10$t63VDvS7uzyfiUcCGrdo6uKyl85UQBGVmSCGSN4gkS3cfkr6RKlUy', '2');
INSERT INTO login VALUES ('b3@gmail.com', 'b3', '$2b$10$JQgrXCPTdmTFqNYBWgfb2uH/.CIQczW.YOJN8hOjQqKnqHFwOiHiC', '2');
INSERT INTO login VALUES ('b4@gmail.com', 'b4', '$2b$10$ujfcTMlNImath.hOYqcUsuwwUYMGo04pndbrLXzSBtaIHVqoZuSOC', '2');
INSERT INTO login VALUES ('b5@gmail.com', 'b5', '$2b$10$INhJ7HbjsQbtg52tjhiLCuA6FTF.ImF9d2IQ5/1ldPhVJWtBCHC/.', '2');
INSERT INTO login VALUES ('b6@gmail.com', 'b6', '$2b$10$yeNRPouz1PzN8QNPTjqtu.q6LemdY5.3Qokbx8.R.XeJK/LdQguSq', '2');
INSERT INTO login VALUES ('b7@gmail.com', 'b7', '$2b$10$KqKo.zSucBiSp8BXDIiWyuT1rcENWHw/EhGgr96QSMp3ITI25806W', '2');
INSERT INTO login VALUES ('b8@gmail.com', 'b8', '$2b$10$gUNjdbPsE7DSF4eVmOREW.og0y8.XR7he5QgsBFxZ8HPCSR12I8se', '2');
INSERT INTO login VALUES ('b9@gmail.com', 'b9', '$2b$10$E1cLbtmD2/oIjUq5Tv0/aOnfawJl8YjWScxxXGiJdxmfnMMfAyjFS', '2');
INSERT INTO login VALUES ('b10@gmail.com', 'b10', '$2b$10$yEGfVsvGAP9YWRg44sTWP.lXufF/SWBLoY3PecucCpSy70AzSHf76', '2');

INSERT INTO bus VALUES ('b1@gmail.com', 'b1', 'c1', '12021-5-20', 'A' , 'B', '2021-05-20');
INSERT INTO bus VALUES ('b2@gmail.com', 'b2', 'c2', '22021-5-21', 'A' , 'C', '2021-05-21');
INSERT INTO bus VALUES ('b3@gmail.com', 'b3', 'c3', '32021-5-22', 'A' , 'D', '2021-05-22');
INSERT INTO bus VALUES ('b4@gmail.com', 'b4', 'c4', '42021-5-23', 'B' , 'A', '2021-05-23');
INSERT INTO bus VALUES ('b5@gmail.com', 'b5', 'c5', '52021-5-24', 'B' , 'C', '2021-05-24');
INSERT INTO bus VALUES ('b6@gmail.com', 'b6', 'c6', '62021-5-25', 'B' , 'D', '2021-05-25');
INSERT INTO bus VALUES ('b7@gmail.com', 'b7', 'c7', '72021-5-26', 'C' , 'A', '2021-05-26');
INSERT INTO bus VALUES ('b8@gmail.com', 'b8', 'c8', '82021-5-27', 'C' , 'B', '2021-05-27');
INSERT INTO bus VALUES ('b9@gmail.com', 'b9', 'c9', '92021-5-28', 'C' , 'D', '2021-05-28');
INSERT INTO bus VALUES ('b10@gmail.com', 'b10', 'c10', '102021-5-29', 'D' , 'A', '2021-05-29');

INSERT INTO passanger VALUES ('a1', '2021-05-20', 'A', 'B', '12021-05-20', 'a1@gmail.com', '3:29:32AM5/12/2021');
INSERT INTO passanger VALUES ('a1', '2021-05-22', 'A', 'D', '32021-05-22', 'a1@gmail.com', '3:29:53AM5/12/2021');
INSERT INTO passanger VALUES ('a1', '2021-05-24', 'B', 'C', '52021-05-24', 'a1@gmail.com', '3:30:17AM5/12/2021');
INSERT INTO passanger VALUES ('a2', '2021-05-23', 'B', 'A', '42021-05-23', 'a2@gmail.com', '3:31:05AM5/12/2021');
INSERT INTO passanger VALUES ('a2', '2021-05-29', 'D', 'A', '102021-05-29', 'a2@gmail.com', '3:31:28AM5/12/2021');
INSERT INTO passanger VALUES ('a3', '2021-05-26', 'C', 'A', '72021-05-26', 'a3@gmail.com', '3:35:03AM5/12/2021');
INSERT INTO passanger VALUES ('a3', '2021-05-27', 'C', 'B', '82021-05-27', 'a3@gmail.com', '3:35:32AM5/12/2021');
INSERT INTO passanger VALUES ('a4', '2021-05-26', 'C', 'A', '72021-05-26', 'a4@gmail.com', '3:36:11AM5/12/2021');
INSERT INTO passanger VALUES ('a5', '2021-05-28', 'C', 'D', '92021-05-28', 'a5@gmail.com', '3:36:38AM5/12/2021');
INSERT INTO passanger VALUES ('a6', '2021-05-21', 'A', 'C', '22021-05-21', 'a6@gmail.com', '3:37:10AM5/12/2021');
INSERT INTO passanger VALUES ('a7', '2021-05-25', 'B', 'D', '62021-05-25', 'a7@gmail.com', '3:37:37AM5/12/2021');
INSERT INTO passanger VALUES ('a8', '2021-05-20', 'A', 'B', '12021-05-20', 'a8@gmail.com', '3:38:06AM5/12/2021');
INSERT INTO passanger VALUES ('a8', '2021-05-29', 'D', 'A', '102021-05-29', 'a8@gmail.com', '3:38:18AM5/12/2021');
INSERT INTO passanger VALUES ('a9', '2021-05-21', 'A', 'C', '22021-05-21', 'a9@gmail.com', '3:38:48AM5/12/2021');
INSERT INTO passanger VALUES ('a9', '2021-05-28', 'C', 'D', '92021-05-28', 'a9@gmail.com', '3:39:17AM5/12/2021');
INSERT INTO passanger VALUES ('a10', '2021-05-22', 'A', 'D', '32021-05-22', 'a10@gmail.com', '3:39:54AM5/12/2021');
INSERT INTO passanger VALUES ('a10', '2021-05-27', 'C', 'B', '82021-05-27', 'a10@gmail.com', '3:40:15AM5/12/2021');