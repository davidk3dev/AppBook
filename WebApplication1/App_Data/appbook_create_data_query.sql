CREATE DATABASE  IF NOT EXISTS `appbook` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `appbook`;
-- MySQL dump 10.13  Distrib 5.7.9, for Win32 (AMD64)
--
-- Host: 127.0.0.1    Database: appbook
-- ------------------------------------------------------
-- Server version	5.7.17-log

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
-- Table structure for table `tb_account`
--

DROP TABLE IF EXISTS `tb_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_account` (
  `id_account` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(150) NOT NULL,
  `password` varchar(100) NOT NULL,
  `id_user` int(11) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `ngay_tao` datetime NOT NULL,
  PRIMARY KEY (`id_account`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_tb_account_tb_user1_idx` (`id_user`),
  CONSTRAINT `fk_Account_User` FOREIGN KEY (`id_user`) REFERENCES `tb_user` (`id_user`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_account`
--

LOCK TABLES `tb_account` WRITE;
/*!40000 ALTER TABLE `tb_account` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_bai`
--

DROP TABLE IF EXISTS `tb_bai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_bai` (
  `id_bai` int(11) NOT NULL AUTO_INCREMENT,
  `id_chuyende` int(11) NOT NULL,
  `ngay_tao` datetime NOT NULL,
  `xuat_ban` tinyint(1) NOT NULL DEFAULT '0',
  `thu_tu` int(11) NOT NULL,
  `bai_mau` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_bai`),
  UNIQUE KEY `thu_tu_UNIQUE` (`thu_tu`),
  KEY `fk_Bai_Chuyende_idx` (`id_chuyende`),
  CONSTRAINT `fk_Bai_Chuyende` FOREIGN KEY (`id_chuyende`) REFERENCES `tb_chuyende` (`id_chuyende`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_bai`
--

LOCK TABLES `tb_bai` WRITE;
/*!40000 ALTER TABLE `tb_bai` DISABLE KEYS */;
INSERT INTO `tb_bai` VALUES (3,3,'2017-01-01 00:00:00',0,1,0),(4,3,'2017-01-01 00:00:00',0,2,0),(5,3,'2017-03-16 22:11:50',0,0,0),(6,4,'2017-03-16 22:15:13',0,3,0),(7,4,'2017-03-16 22:17:01',0,4,0),(8,3,'2017-01-01 00:00:00',0,5,0),(9,3,'2017-01-01 00:00:00',0,6,0);
/*!40000 ALTER TABLE `tb_bai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_bai_templatenoidung`
--

DROP TABLE IF EXISTS `tb_bai_templatenoidung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_bai_templatenoidung` (
  `id_bai` int(11) NOT NULL,
  `id_templatenoidung` int(11) NOT NULL,
  PRIMARY KEY (`id_bai`,`id_templatenoidung`),
  KEY `fk_TempNDBai_TemplateNoidung_idx` (`id_templatenoidung`),
  CONSTRAINT `fk_TempNDBai_Bai` FOREIGN KEY (`id_bai`) REFERENCES `tb_bai` (`id_bai`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_TempNDBai_TemplateNoidung` FOREIGN KEY (`id_templatenoidung`) REFERENCES `tb_templatenoidung` (`id_templatenoidung`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_bai_templatenoidung`
--

LOCK TABLES `tb_bai_templatenoidung` WRITE;
/*!40000 ALTER TABLE `tb_bai_templatenoidung` DISABLE KEYS */;
INSERT INTO `tb_bai_templatenoidung` VALUES (3,1),(3,2),(8,3);
/*!40000 ALTER TABLE `tb_bai_templatenoidung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_baimau`
--

DROP TABLE IF EXISTS `tb_baimau`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_baimau` (
  `id_baimau` int(11) NOT NULL,
  `id_bai` int(11) NOT NULL,
  `id_account` int(11) NOT NULL,
  `ten_baimau` varchar(100) NOT NULL,
  PRIMARY KEY (`id_baimau`),
  KEY `fk_baimau_bai_idx` (`id_bai`),
  KEY `fk_baimau_account_idx` (`id_account`),
  CONSTRAINT `fk_baimau_account` FOREIGN KEY (`id_account`) REFERENCES `tb_account` (`id_account`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_baimau_bai` FOREIGN KEY (`id_bai`) REFERENCES `tb_bai` (`id_bai`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_baimau`
--

LOCK TABLES `tb_baimau` WRITE;
/*!40000 ALTER TABLE `tb_baimau` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_baimau` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_cauhoi`
--

DROP TABLE IF EXISTS `tb_cauhoi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_cauhoi` (
  `id_cauhoi` int(11) NOT NULL AUTO_INCREMENT,
  `id_bai` int(11) NOT NULL,
  `xuat_ban` tinyint(1) NOT NULL DEFAULT '0',
  `loai_cau_hoi` varchar(45) NOT NULL,
  `phuong_thuc_check_dap_an` varchar(45) DEFAULT NULL,
  `ngay_tao` datetime DEFAULT NULL,
  `gia_tri_dung` varchar(200) DEFAULT NULL,
  `thu_tu` int(11) NOT NULL,
  PRIMARY KEY (`id_cauhoi`),
  UNIQUE KEY `thu_tu_UNIQUE` (`thu_tu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_cauhoi`
--

LOCK TABLES `tb_cauhoi` WRITE;
/*!40000 ALTER TABLE `tb_cauhoi` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_cauhoi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_cauhoi_templatenoidung`
--

DROP TABLE IF EXISTS `tb_cauhoi_templatenoidung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_cauhoi_templatenoidung` (
  `id_cauhoi` int(11) NOT NULL,
  `id_templatenoidung` int(11) NOT NULL,
  PRIMARY KEY (`id_cauhoi`,`id_templatenoidung`),
  KEY `fk_TemplateNoidung_CauHoi_idx` (`id_templatenoidung`),
  CONSTRAINT `fk_CauHoi_TemplateNoidung` FOREIGN KEY (`id_cauhoi`) REFERENCES `tb_cauhoi` (`id_cauhoi`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_TemplateNoidung_CauHoi` FOREIGN KEY (`id_templatenoidung`) REFERENCES `tb_templatenoidung` (`id_templatenoidung`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_cauhoi_templatenoidung`
--

LOCK TABLES `tb_cauhoi_templatenoidung` WRITE;
/*!40000 ALTER TABLE `tb_cauhoi_templatenoidung` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_cauhoi_templatenoidung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_chuyende`
--

DROP TABLE IF EXISTS `tb_chuyende`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_chuyende` (
  `id_chuyende` int(11) NOT NULL AUTO_INCREMENT,
  `id_thuvien` int(11) NOT NULL,
  `ten_chuyende` varchar(150) NOT NULL,
  `ngay_tao` datetime NOT NULL,
  PRIMARY KEY (`id_chuyende`),
  KEY `fk_Chuyende_Thuvien_idx` (`id_thuvien`),
  CONSTRAINT `fk_Chuyende_Thuvien` FOREIGN KEY (`id_thuvien`) REFERENCES `tb_thuvien` (`id_thuvien`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_chuyende`
--

LOCK TABLES `tb_chuyende` WRITE;
/*!40000 ALTER TABLE `tb_chuyende` DISABLE KEYS */;
INSERT INTO `tb_chuyende` VALUES (3,1,'Chuyen de 1','2017-01-01 00:00:00'),(4,2,'Chuyen de 2','2017-02-02 00:00:00');
/*!40000 ALTER TABLE `tb_chuyende` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_comment`
--

DROP TABLE IF EXISTS `tb_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_comment` (
  `id_comment` int(11) NOT NULL AUTO_INCREMENT,
  `id_account` int(11) NOT NULL,
  `id_cauhoi` int(11) NOT NULL,
  `ngay_tao` datetime DEFAULT NULL,
  `noi_dung` varchar(300) NOT NULL,
  `reply_for` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_comment`),
  KEY `fk_selfref_replyfor_idx` (`reply_for`),
  KEY `fk_comment_cauhoi_idx` (`id_cauhoi`),
  KEY `fk_comment_account_idx` (`id_account`),
  CONSTRAINT `fk_comment_account` FOREIGN KEY (`id_account`) REFERENCES `tb_account` (`id_account`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_cauhoi` FOREIGN KEY (`id_cauhoi`) REFERENCES `tb_cauhoi` (`id_cauhoi`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_selfref_replyfor` FOREIGN KEY (`reply_for`) REFERENCES `tb_comment` (`id_comment`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_comment`
--

LOCK TABLES `tb_comment` WRITE;
/*!40000 ALTER TABLE `tb_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_dapan`
--

DROP TABLE IF EXISTS `tb_dapan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_dapan` (
  `id_dapan` int(11) NOT NULL AUTO_INCREMENT,
  `id_cauhoi` int(11) NOT NULL,
  `loai_dap_an` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_dapan`),
  KEY `fk_DapAn_CauHoi_idx` (`id_cauhoi`),
  CONSTRAINT `fk_DapAn_CauHoi` FOREIGN KEY (`id_cauhoi`) REFERENCES `tb_cauhoi` (`id_cauhoi`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_dapan`
--

LOCK TABLES `tb_dapan` WRITE;
/*!40000 ALTER TABLE `tb_dapan` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_dapan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_dapan_danhdau`
--

DROP TABLE IF EXISTS `tb_dapan_danhdau`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_dapan_danhdau` (
  `id_dapan` int(11) NOT NULL,
  `vitri_dung` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_dapan`),
  CONSTRAINT `fk_dapandanhdau_dapan` FOREIGN KEY (`id_dapan`) REFERENCES `tb_dapan` (`id_dapan`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_dapan_danhdau`
--

LOCK TABLES `tb_dapan_danhdau` WRITE;
/*!40000 ALTER TABLE `tb_dapan_danhdau` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_dapan_danhdau` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_dapan_dientext`
--

DROP TABLE IF EXISTS `tb_dapan_dientext`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_dapan_dientext` (
  `id_dapan` int(11) NOT NULL,
  `giatri_dung` varchar(500) DEFAULT NULL,
  `help_text` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id_dapan`),
  CONSTRAINT `fk_dapandientext_dapan` FOREIGN KEY (`id_dapan`) REFERENCES `tb_dapan` (`id_dapan`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_dapan_dientext`
--

LOCK TABLES `tb_dapan_dientext` WRITE;
/*!40000 ALTER TABLE `tb_dapan_dientext` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_dapan_dientext` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_dapan_sapxep`
--

DROP TABLE IF EXISTS `tb_dapan_sapxep`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_dapan_sapxep` (
  `id_dapan` int(11) NOT NULL,
  `giatri` varchar(100) DEFAULT NULL,
  `noidung_hienthi` varchar(100) NOT NULL,
  `vitri_dung` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_dapan`,`noidung_hienthi`),
  CONSTRAINT `fk_dapansapxep_dapan` FOREIGN KEY (`id_dapan`) REFERENCES `tb_dapan` (`id_dapan`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_dapan_sapxep`
--

LOCK TABLES `tb_dapan_sapxep` WRITE;
/*!40000 ALTER TABLE `tb_dapan_sapxep` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_dapan_sapxep` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_dapan_singlechoice`
--

DROP TABLE IF EXISTS `tb_dapan_singlechoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_dapan_singlechoice` (
  `id_dapan` int(11) NOT NULL,
  `noidung` varchar(300) DEFAULT NULL,
  `dapan_dung` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_dapan`),
  CONSTRAINT `fk_DapAnSingleChoice_DapAn` FOREIGN KEY (`id_dapan`) REFERENCES `tb_dapan` (`id_dapan`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_dapan_singlechoice`
--

LOCK TABLES `tb_dapan_singlechoice` WRITE;
/*!40000 ALTER TABLE `tb_dapan_singlechoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_dapan_singlechoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_templatenoidung`
--

DROP TABLE IF EXISTS `tb_templatenoidung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_templatenoidung` (
  `id_templatenoidung` int(11) NOT NULL AUTO_INCREMENT,
  `loai_template` varchar(150) NOT NULL,
  PRIMARY KEY (`id_templatenoidung`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_templatenoidung`
--

LOCK TABLES `tb_templatenoidung` WRITE;
/*!40000 ALTER TABLE `tb_templatenoidung` DISABLE KEYS */;
INSERT INTO `tb_templatenoidung` VALUES (1,'TEXT'),(2,'TEXT'),(3,'TEXT');
/*!40000 ALTER TABLE `tb_templatenoidung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_templatenoidung_bainghe`
--

DROP TABLE IF EXISTS `tb_templatenoidung_bainghe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_templatenoidung_bainghe` (
  `id_templatenoidung` int(11) NOT NULL,
  `url` varchar(100) NOT NULL,
  PRIMARY KEY (`id_templatenoidung`),
  CONSTRAINT `fk_bainghe_templatenoidung` FOREIGN KEY (`id_templatenoidung`) REFERENCES `tb_templatenoidung` (`id_templatenoidung`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_templatenoidung_bainghe`
--

LOCK TABLES `tb_templatenoidung_bainghe` WRITE;
/*!40000 ALTER TABLE `tb_templatenoidung_bainghe` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_templatenoidung_bainghe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_templatenoidung_hinhanh`
--

DROP TABLE IF EXISTS `tb_templatenoidung_hinhanh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_templatenoidung_hinhanh` (
  `id_templatenoidung` int(11) NOT NULL,
  `url` varchar(100) NOT NULL,
  PRIMARY KEY (`id_templatenoidung`),
  CONSTRAINT `fk_hinhanh_tempatenoidung` FOREIGN KEY (`id_templatenoidung`) REFERENCES `tb_templatenoidung` (`id_templatenoidung`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_templatenoidung_hinhanh`
--

LOCK TABLES `tb_templatenoidung_hinhanh` WRITE;
/*!40000 ALTER TABLE `tb_templatenoidung_hinhanh` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_templatenoidung_hinhanh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_templatenoidung_text`
--

DROP TABLE IF EXISTS `tb_templatenoidung_text`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_templatenoidung_text` (
  `id_templatenoidung` int(11) NOT NULL,
  `noidung` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id_templatenoidung`),
  CONSTRAINT `fk_NDText_TemplateND` FOREIGN KEY (`id_templatenoidung`) REFERENCES `tb_templatenoidung` (`id_templatenoidung`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_templatenoidung_text`
--

LOCK TABLES `tb_templatenoidung_text` WRITE;
/*!40000 ALTER TABLE `tb_templatenoidung_text` DISABLE KEYS */;
INSERT INTO `tb_templatenoidung_text` VALUES (1,'Cong trinh dang thi cong'),(2,'Good morning'),(3,'cong hoa xa hoi chu nghia viet nam');
/*!40000 ALTER TABLE `tb_templatenoidung_text` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_templatenoidunghinhanh_format`
--

DROP TABLE IF EXISTS `tb_templatenoidunghinhanh_format`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_templatenoidunghinhanh_format` (
  `id_format` int(11) NOT NULL AUTO_INCREMENT,
  `id_templatenoidunghinhanh` int(11) NOT NULL,
  `width` varchar(45) DEFAULT NULL,
  `height` varchar(45) DEFAULT NULL,
  `alignment` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_format`),
  KEY `fk_format_hinhanh_idx` (`id_templatenoidunghinhanh`),
  CONSTRAINT `fk_format_hinhanh` FOREIGN KEY (`id_templatenoidunghinhanh`) REFERENCES `tb_templatenoidung_hinhanh` (`id_templatenoidung`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_templatenoidunghinhanh_format`
--

LOCK TABLES `tb_templatenoidunghinhanh_format` WRITE;
/*!40000 ALTER TABLE `tb_templatenoidunghinhanh_format` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_templatenoidunghinhanh_format` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_templatenoidungtext_format`
--

DROP TABLE IF EXISTS `tb_templatenoidungtext_format`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_templatenoidungtext_format` (
  `id_format` int(11) NOT NULL AUTO_INCREMENT,
  `id_templatenoidungtext` int(11) NOT NULL,
  `ckeditor_text_format` varchar(1000) DEFAULT NULL,
  `template_width` varchar(45) DEFAULT NULL,
  `template_heigth` varchar(45) DEFAULT NULL,
  `template_alignment` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_format`),
  KEY `fk_Format_NDText_idx` (`id_templatenoidungtext`),
  CONSTRAINT `fk_Format_NDText` FOREIGN KEY (`id_templatenoidungtext`) REFERENCES `tb_templatenoidung_text` (`id_templatenoidung`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_templatenoidungtext_format`
--

LOCK TABLES `tb_templatenoidungtext_format` WRITE;
/*!40000 ALTER TABLE `tb_templatenoidungtext_format` DISABLE KEYS */;
INSERT INTO `tb_templatenoidungtext_format` VALUES (1,1,'ckeditor format','100px','50px','center'),(2,2,'ckeditor format 2','200px','100px','center');
/*!40000 ALTER TABLE `tb_templatenoidungtext_format` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_thuvien`
--

DROP TABLE IF EXISTS `tb_thuvien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_thuvien` (
  `id_thuvien` int(11) NOT NULL AUTO_INCREMENT,
  `ten_thuvien` varchar(150) NOT NULL,
  PRIMARY KEY (`id_thuvien`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_thuvien`
--

LOCK TABLES `tb_thuvien` WRITE;
/*!40000 ALTER TABLE `tb_thuvien` DISABLE KEYS */;
INSERT INTO `tb_thuvien` VALUES (1,'Thu Vien 1'),(2,'Thu Vien 2'),(3,'Thu Vien 3'),(4,'Thu Vien 1');
/*!40000 ALTER TABLE `tb_thuvien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `user_type` varchar(100) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-07-10  9:16:58
