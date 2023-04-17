-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mar. 21 mars 2023 à 10:27
-- Version du serveur :  5.7.19
-- Version de PHP :  5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `emit_mini_chat`
--

-- --------------------------------------------------------

--
-- Structure de la table `amis`
--

DROP TABLE IF EXISTS `amis`;
CREATE TABLE IF NOT EXISTS `amis` (
  `idA` int(11) NOT NULL AUTO_INCREMENT,
  `idU1` int(11) NOT NULL,
  `idU2` int(11) NOT NULL,
  `nomU1` varchar(100) NOT NULL,
  `nomU2` varchar(100) NOT NULL,
  `amitier` tinyint(1) DEFAULT '0',
  `dateInvitation` date DEFAULT NULL,
  `photoU2` varchar(255) NOT NULL,
  `photoU1` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idA`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `amis`
--

INSERT INTO `amis` (`idA`, `idU1`, `idU2`, `nomU1`, `nomU2`, `amitier`, `dateInvitation`, `photoU2`, `photoU1`) VALUES
(2, 1, 2, 'one', 'two', 1, '2023-03-13', '1672771262506-logo.jpg', '1672771262506-logo.jpg'),
(3, 4, 5, 'Trofel', 'five', 1, '2023-03-15', 'Aucune', NULL),
(4, 4, 1, 'Trofel', 'one', 0, '2023-03-15', '1672771262506-logo.jpg', '1672771262506-logo.jpg'),
(5, 5, 1, 'five', 'one', 0, '2023-03-15', '1672771262506-logo.jpg', '1672771262506-logo.jpg'),
(7, 4, 2, 'Trofel', 'two', 1, '2023-03-15', '1672771262506-logo.jpg', '1672771262506-logo.jpg'),
(8, 4, 5, 'Trofel', 'five', 0, '2023-03-20', 'Aucune', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `groupe`
--

DROP TABLE IF EXISTS `groupe`;
CREATE TABLE IF NOT EXISTS `groupe` (
  `idG` int(11) NOT NULL AUTO_INCREMENT,
  `nomG` varchar(255) NOT NULL,
  `idMembreG` varchar(255) NOT NULL,
  `nomMembreG` varchar(255) NOT NULL,
  `dateG` date DEFAULT NULL,
  PRIMARY KEY (`idG`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `groupe`
--

INSERT INTO `groupe` (`idG`, `nomG`, `idMembreG`, `nomMembreG`, `dateG`) VALUES
(1, 'Notre 1er Groupe', '1;2;4', 'One;Two;Trofel', '2023-03-13'),
(2, 'Goropiko', '1;2;4;5', 'One;Two;Trofel;Five', '2023-03-13');

-- --------------------------------------------------------

--
-- Structure de la table `smsgrouper`
--

DROP TABLE IF EXISTS `smsgrouper`;
CREATE TABLE IF NOT EXISTS `smsgrouper` (
  `idMG` int(11) NOT NULL AUTO_INCREMENT,
  `idU1` int(11) NOT NULL,
  `nomU1` varchar(100) NOT NULL,
  `idUGroupLu` varchar(255) DEFAULT NULL,
  `nomGroupLu` varchar(255) DEFAULT NULL,
  `smsGrouper` varchar(255) NOT NULL,
  `idG` int(11) NOT NULL,
  `dateMessage` date DEFAULT NULL,
  PRIMARY KEY (`idMG`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `smsgrouper`
--

INSERT INTO `smsgrouper` (`idMG`, `idU1`, `nomU1`, `idUGroupLu`, `nomGroupLu`, `smsGrouper`, `idG`, `dateMessage`) VALUES
(1, 1, 'One', '2', 'Two', 'Bonjour les gens!', 1, '2023-03-13'),
(2, 4, 'Trofel', '2', 'Two', 'Bonjour les gens!', 1, '2023-03-13'),
(3, 4, 'Trofel', NULL, NULL, 'wassup dogs2', 2, '2023-03-20'),
(4, 4, 'Trofel', NULL, NULL, 'wassup !!!!', 2, '2023-03-20'),
(5, 1, 'one', NULL, NULL, 'Hi mdfr xD', 2, '2023-03-21');

-- --------------------------------------------------------

--
-- Structure de la table `smspriver`
--

DROP TABLE IF EXISTS `smspriver`;
CREATE TABLE IF NOT EXISTS `smspriver` (
  `idMP` int(11) NOT NULL AUTO_INCREMENT,
  `idU1` int(11) NOT NULL,
  `idU2` int(11) NOT NULL,
  `dateSMS` date DEFAULT NULL,
  `smsPriver` varchar(255) NOT NULL,
  `vu` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`idMP`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `smspriver`
--

INSERT INTO `smspriver` (`idMP`, `idU1`, `idU2`, `dateSMS`, `smsPriver`, `vu`) VALUES
(1, 1, 2, '2023-03-13', 'Bonjour mon Two', 1),
(2, 4, 2, '2023-03-13', 'Bonjour mon Two, c\'est Trofel', 1),
(3, 2, 4, '2023-03-13', 'Bonjour lets Trofel, ca va ve?', 1),
(4, 4, 2, '2023-03-20', 'hello two2', 0),
(5, 4, 2, '2023-03-20', 'hello two24', 0),
(6, 4, 2, '2023-03-20', 'elle n\'a p peur', 0),
(7, 4, 2, '2023-03-20', 'elle n\'a p peur2', 0),
(8, 4, 2, '2023-03-20', 'elle n\'a p peur22', 0),
(9, 4, 2, '2023-03-20', 'tst', 0),
(10, 4, 2, '2023-03-20', 'tst2', 0),
(11, 4, 2, '2023-03-20', 'xxx', 0),
(12, 4, 2, '2023-03-20', 'xxx2', 0),
(13, 2, 4, '2023-03-20', 'desoler, j\'ai pas vu tes mp mon cher Trofel.', 0),
(14, 1, 2, '2023-03-21', 'Tu ne me réponds pas ?', 0),
(15, 2, 1, '2023-03-21', 'salut mon ami', 0);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `idU` int(11) NOT NULL AUTO_INCREMENT,
  `mail` varchar(100) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `mdp` varchar(100) NOT NULL,
  `photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateU` date DEFAULT NULL,
  PRIMARY KEY (`idU`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`idU`, `mail`, `nom`, `prenom`, `mdp`, `photo`, `dateU`) VALUES
(1, 'one@gmail.com', 'one', 'one', '$2b$10$jyIdwhRl77kuH4nLZDv3Nu0OH0s6Bd/xAIwE2RVdxDpJRzc69uYxO', '1672771262506-logo.jpg', '2023-03-08'),
(2, 'two@gmail.com', 'two', 'two', '$2b$10$jyIdwhRl77kuH4nLZDv3Nu0OH0s6Bd/xAIwE2RVdxDpJRzc69uYxO', 'two', '2023-03-13'),
(4, 'nuno@gmail.com', 'Trofel', 'nuno', '$2b$10$jyIdwhRl77kuH4nLZDv3Nu0OH0s6Bd/xAIwE2RVdxDpJRzc69uYxO', '1672771262506-logo.jpg', '2023-03-13'),
(5, 'five@gmail.com', 'five', 'five', '$2b$10$jyIdwhRl77kuH4nLZDv3Nu0OH0s6Bd/xAIwE2RVdxDpJRzc69uYxO', 'Aucune', '2023-03-13'),
(6, 'chae@gmail.com', 'chae', 'charone', '$2b$10$JUOFTJhR3L5KXpIYFClD7OvRIIPy8EBPyHcsPldazVG2uclrxLEvq', 'Aucune', '2023-03-21'),
(7, 'eni@gmail.com', 'enii', 'enii', '$2b$10$qbakzf3blXcGTA4nBUH/5.3HKZ/YUDl8P1G92sk7lcMwVLcYjoKIi', 'Aucune', '2023-03-21'),
(8, 'eni2@gmail.com', 'eni2', 'eni2', '$2b$10$G9./HtHA7XckA7oAwCN1iOLVnu59TQH5.BwPEindJZzQLIecnobi6', '1679381887775-logoENI.png', '2023-03-21'),
(9, 'Badud@gmail.com', 'Santatra', 'Faneva', '$2b$10$Yahb3aC0mUcENPKiZLEn9OJr4pzgiskIc2lBH1VVyp.ZAKgxGkccu', 'Aucune', '2023-03-21');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
