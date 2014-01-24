CREATE DATABASE  IF NOT EXISTS `readcomment` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `readcomment`;
-- MySQL dump 10.13  Distrib 5.6.13, for Win32 (x86)
--
-- Host: localhost    Database: readcomment
-- ------------------------------------------------------
-- Server version	5.6.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booksinfo`
--

DROP TABLE IF EXISTS `booksinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booksinfo` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `createUser` varchar(45) DEFAULT NULL,
  `paragraphCount` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booksinfo`
--

LOCK TABLES `booksinfo` WRITE;
/*!40000 ALTER TABLE `booksinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `booksinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentsinfo`
--

DROP TABLE IF EXISTS `commentsinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commentsinfo` (
  `id` int(11) NOT NULL,
  `booksId` int(11) NOT NULL,
  `paragraphId` int(11) DEFAULT NULL,
  `content` longtext,
  `createUser` varchar(45) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`booksId`),
  KEY `parag_idx` (`paragraphId`),
  KEY `books_idx` (`booksId`),
  CONSTRAINT `parag` FOREIGN KEY (`paragraphId`) REFERENCES `paragraphsinfo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `books` FOREIGN KEY (`booksId`) REFERENCES `booksinfo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentsinfo`
--

LOCK TABLES `commentsinfo` WRITE;
/*!40000 ALTER TABLE `commentsinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `commentsinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paragraphsinfo`
--

DROP TABLE IF EXISTS `paragraphsinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paragraphsinfo` (
  `id` int(11) NOT NULL,
  `bookId` varchar(45) DEFAULT NULL,
  `content` longtext,
  `commentCount` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paragraphsinfo`
--

LOCK TABLES `paragraphsinfo` WRITE;
/*!40000 ALTER TABLE `paragraphsinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `paragraphsinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userbooksinfo`
--

DROP TABLE IF EXISTS `userbooksinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userbooksinfo` (
  `username` varchar(45) NOT NULL,
  `booksId` int(11) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userbooksinfo`
--

LOCK TABLES `userbooksinfo` WRITE;
/*!40000 ALTER TABLE `userbooksinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `userbooksinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersinfo`
--

DROP TABLE IF EXISTS `usersinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usersinfo` (
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `img` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`username`,`password`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersinfo`
--

LOCK TABLES `usersinfo` WRITE;
/*!40000 ALTER TABLE `usersinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `usersinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-01-24 22:20:47
