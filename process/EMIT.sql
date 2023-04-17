DROP database EMIT_MINI_CHAT;

create database EMIT_MINI_CHAT;

use EMIT_MINI_CHAT;

create table UTILISATEUR (
    idU int(11) NOT NULL AUTO_INCREMENT,
    mail varchar(100) NOT NULL,
    nom varchar(100) NOT NULL,
    prenom varchar(100) NOT NULL,
    mdp varchar(100) NOT NULL,
    photo varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    dateU date,
    PRIMARY KEY (idU)
) ENGINE = INNODB;

create table AMIS(
    idA int(11) NOT NULL AUTO_INCREMENT,
    idU1 int(11) NOT NULL,
    idU2 int(11) NOT NULL,
    nomU1 varchar(100) NOT NULL,
    nomU2 varchar(100) NOT NULL,
    photoU1 varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    photoU2 varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    amitier BOOLEAN DEFAULT '0',
    dateInvitation date,
    -- if(Accept) amitier=true UPDATE
    PRIMARY KEY (idA)
) ENGINE = INNODB;

create table SMSPRIVER (
    idMP int(11) NOT NULL AUTO_INCREMENT,
    idU1 int(11) NOT NULL,
    idU2 int(11) NOT NULL,
    dateSMS date,
    smsPriver varchar(255) NOT NULL,
    vu BOOLEAN DEFAULT '0',
    -- if(idU2_Lu) vu=true UPDATE
    PRIMARY KEY (idMP)
) ENGINE = INNODB;

create table GROUPE(
    idG int(11) NOT NULL AUTO_INCREMENT,
    nomG varchar(255) NOT NULL,
    idMembreG varchar(255) DEFAULT NULL,
    -- Liste idU splite by " ; " 
    nomMembreG varchar(255) NOT NULL,
    dateG date,
    PRIMARY KEY (idG)
) ENGINE = INNODB;

create table SMSGROUPER (
    idMG int(11) NOT NULL AUTO_INCREMENT,
    idU1 int(11) NOT NULL,
    nomU1 varchar(100) NOT NULL,
    idUGroupLu varchar(255) DEFAULT NULL,
    -- if(idUGroupLu) UPDATE
    nomGroupLu varchar(255) DEFAULT NULL,
    -- if(nomGroupLu) UPDATE same time
    smsGrouper varchar(255) NOT NULL,
    idG int(11) NOT NULL,
    dateMessage date,
    PRIMARY KEY (idMG)
) ENGINE = INNODB;
