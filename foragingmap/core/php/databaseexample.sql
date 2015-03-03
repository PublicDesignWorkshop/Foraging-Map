-- phpMyAdmin SQL Dump
-- version 4.0.10.8
-- http://www.phpmyadmin.net
--
-- Host: db564759461.db.1and1.com:3306
-- Generation Time: Mar 03, 2015 at 05:56 PM
-- Server version: 5.1.73-log
-- PHP Version: 5.2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `db564759461`
--

-- --------------------------------------------------------

--
-- Table structure for table `fm_bend`
--

CREATE TABLE IF NOT EXISTS `fm_bend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `value` float NOT NULL,
  `date` datetime NOT NULL,
  `update` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=89 ;

--
-- Dumping data for table `fm_bend`
--

INSERT INTO `fm_bend` (`id`, `pid`, `type`, `value`, `date`, `update`) VALUES
(9, 1, 1, 8, '2015-01-13 23:11:00', '2015-01-24 23:11:00'),
(8, 1, 1, 5, '2014-12-17 23:10:00', '2015-01-24 23:11:00'),
(7, 1, 1, 3.2, '2014-11-11 23:10:00', '2015-01-25 00:57:35'),
(10, 1, 1, 11, '2015-01-20 23:49:00', '2015-01-24 23:49:30'),
(11, 2, 1, 4, '2014-09-15 01:05:00', '2015-01-25 01:05:24'),
(12, 2, 1, 5, '2014-10-15 01:05:00', '2015-01-25 01:05:36'),
(13, 2, 1, 8, '2014-12-02 01:05:00', '2015-01-25 01:05:46'),
(14, 2, 1, 12, '2015-01-13 01:05:00', '2015-01-25 01:05:56'),
(15, 2, 1, 13, '2015-01-25 14:58:00', '2015-01-25 14:58:36'),
(18, 3, 1, 0.21, '2014-08-03 22:58:00', '2015-01-25 22:59:14'),
(19, 3, 1, 0.5, '2014-10-07 22:58:00', '2015-01-25 22:59:20'),
(20, 3, 1, 5, '2014-10-31 22:59:00', '2015-01-25 22:59:30'),
(21, 3, 1, 12, '2014-11-04 22:59:00', '2015-01-25 22:59:38'),
(22, 3, 1, 15, '2014-11-21 22:59:00', '2015-01-25 22:59:45'),
(23, 3, 1, 25, '2014-12-16 22:59:00', '2015-01-25 22:59:52'),
(65, 10, 1, 12, '2015-02-16 14:28:00', '2015-02-22 14:28:54'),
(64, 10, 1, 5, '2015-01-14 14:28:00', '2015-02-22 14:28:46'),
(63, 10, 1, 2, '2014-12-26 14:17:00', '2015-02-22 14:28:36'),
(28, 5, 1, -1, '2015-01-26 06:18:00', '2015-01-26 11:18:41'),
(29, 5, 1, 1, '2015-01-26 09:18:00', '2015-01-26 11:20:00'),
(30, 5, 1, 3, '2015-01-26 11:19:00', '2015-01-26 11:20:11'),
(31, 5, 1, 5, '2015-01-26 12:20:00', '2015-01-26 11:20:18'),
(32, 5, 1, 8, '2015-01-26 13:20:00', '2015-01-26 11:20:29'),
(33, 5, 1, 12.56, '2015-01-26 14:20:00', '2015-01-26 12:09:07'),
(34, 5, 1, 19, '2015-01-26 16:20:00', '2015-01-26 12:09:16'),
(35, 5, 1, 21, '2015-01-26 17:20:00', '2015-01-26 11:21:02'),
(36, 5, 1, 22, '2015-01-26 16:21:00', '2015-01-26 11:21:10'),
(37, 5, 1, 25, '2015-01-26 18:21:00', '2015-01-26 11:21:46'),
(38, 5, 1, 30, '2015-01-26 18:21:00', '2015-01-26 11:21:55'),
(39, 5, 1, 31, '2015-01-26 19:21:00', '2015-01-26 11:22:04'),
(40, 5, 1, 33, '2015-01-26 20:22:00', '2015-01-26 11:22:10'),
(41, 5, 1, 35, '2015-01-26 22:22:00', '2015-01-26 11:22:22'),
(42, 5, 1, 38, '2015-01-26 23:25:00', '2015-01-26 11:22:33'),
(43, 5, 1, 42, '2015-01-27 01:22:00', '2015-01-26 11:23:29'),
(44, 5, 1, 48, '2015-01-27 02:23:00', '2015-01-26 11:23:37'),
(47, 4, 1, 464, '2015-02-02 14:08:54', '2015-02-02 14:08:54'),
(46, 5, 1, 40, '2015-01-26 23:07:00', '2015-02-22 14:16:16'),
(48, 1, 1, 13, '2015-02-02 17:05:53', '2015-02-02 17:05:53'),
(49, 1, 1, 15, '2015-02-02 17:25:24', '2015-02-02 17:25:24'),
(50, 4, 1, 360, '2014-12-16 09:47:00', '2015-02-22 15:02:01'),
(52, 4, 1, 220, '2014-09-08 22:04:00', '2015-02-22 15:01:44'),
(53, 7, 1, 30, '2015-02-08 22:34:00', '2015-02-08 22:35:05'),
(56, 2, 1, 13, '2015-02-09 12:31:29', '2015-02-09 12:31:29'),
(57, 1, 1, 20, '2015-02-09 12:49:05', '2015-02-09 12:49:05'),
(59, 1, 1, 33, '2015-02-16 10:56:00', '2015-03-02 11:52:02'),
(60, 1, 1, 44, '2015-02-17 16:51:49', '2015-02-17 16:51:49'),
(61, 1, 1, 31, '2015-02-17 16:57:03', '2015-02-17 16:57:03'),
(62, 1, 1, 43, '2015-02-17 16:57:52', '2015-02-17 16:57:52'),
(66, -1, 1, 0, '2015-02-23 13:50:09', '2015-02-23 13:50:09'),
(67, -1, 1, 0, '2015-02-23 13:55:54', '2015-02-23 13:55:54'),
(68, -1, 1, 0, '2015-02-23 13:58:35', '2015-02-23 13:58:35'),
(69, -1, 1, 0, '2015-02-23 13:59:04', '2015-02-23 13:59:04'),
(70, -1, 1, 0, '2015-02-23 14:11:49', '2015-02-23 14:11:49'),
(71, -1, 1, 0, '2015-02-23 14:12:16', '2015-02-23 14:12:16'),
(72, -1, 1, 16, '2015-02-23 14:14:17', '2015-02-23 14:14:17'),
(73, -1, 1, 16, '2015-02-23 14:14:47', '2015-02-23 14:14:47'),
(74, -1, 1, 16, '2015-02-23 14:24:25', '2015-02-23 14:24:25'),
(75, -1, 1, 16, '2015-02-23 14:24:55', '2015-02-23 14:24:55'),
(76, -1, 1, 16, '2015-02-23 14:25:52', '2015-02-23 14:25:52'),
(77, -1, 1, 16, '2015-02-23 14:26:41', '2015-02-23 14:26:41'),
(78, -1, 1, 16, '2015-02-23 14:27:30', '2015-02-23 14:27:30'),
(79, 19, 1, 16, '2015-03-02 12:10:58', '2015-03-02 12:10:58'),
(80, 19, 1, 17, '2015-03-02 12:11:28', '2015-03-02 12:11:28'),
(81, 19, 1, 16, '2015-03-02 12:11:55', '2015-03-02 12:11:55'),
(82, 19, 1, 16, '2015-03-02 12:12:20', '2015-03-02 12:12:20'),
(83, 19, 1, 16, '2015-03-02 12:12:51', '2015-03-02 12:12:51'),
(84, 20, 1, 1, '2015-03-02 12:18:00', '2015-03-02 12:18:50'),
(85, -1, 1, 20, '2015-03-02 13:08:23', '2015-03-02 13:08:23'),
(86, -1, 1, 20, '2015-03-02 13:08:43', '2015-03-02 13:08:43'),
(87, 15, 1, 20, '2015-03-02 13:54:02', '2015-03-02 13:54:02');

-- --------------------------------------------------------

--
-- Table structure for table `fm_item`
--

CREATE TABLE IF NOT EXISTS `fm_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `desc` text NOT NULL,
  `serial` varchar(16) NOT NULL,
  `type` int(11) NOT NULL,
  `sort` int(11) NOT NULL,
  `amount` float NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `regdate` datetime NOT NULL,
  `update` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `serial` (`serial`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `fm_item`
--

INSERT INTO `fm_item` (`id`, `name`, `desc`, `serial`, `type`, `sort`, `amount`, `lat`, `lng`, `regdate`, `update`) VALUES
(1, 'Grape 1', 'Grape 1 Desc', 'BS101', 1, 3, 5, 33.771549141411, -84.392831325531, '2015-01-24 22:35:28', '2015-02-22 14:57:38'),
(2, 'Peach 3', 'Peach 3 Desc', 'BS102', 1, 2, 15, 33.776079598653, -84.395020008087, '2015-01-25 01:05:01', '2015-02-22 14:56:53'),
(3, 'Peach 1', 'Peach 1 Desc 2', 'BS007', 1, 2, 7, 33.7734041607427, -84.3836259841919, '2015-01-25 19:51:16', '2015-03-02 12:16:07'),
(4, 'Apple 1', 'Apple 1 Desc', 'BS003', 1, 1, 8, 33.777524300382, -84.390878677368, '2015-01-26 07:39:50', '2015-02-23 12:37:28'),
(5, 'Berry 1', 'Berry 1 Desc', 'BS105', 1, 5, 17, 33.768909236963, -84.390320777893, '2015-01-26 11:16:12', '2015-02-22 14:38:37'),
(10, 'Banana 1', 'Banana 1 Desc', 'BS106', 1, 7, 12, 33.776579004475, -84.388647079468, '2015-02-09 12:37:18', '2015-03-02 12:20:02'),
(14, 'Peach 2', 'Peach 2 Desc', 'BS004', 1, 2, 16, 33.785639147363, -84.375472068787, '2015-02-22 14:55:43', '2015-02-22 14:55:43'),
(15, 'Culc Test', 'Culc Test Desc', 'BS001', 1, 6, 4, 33.777158668297, -84.392927885056, '2015-02-22 16:40:15', '2015-03-02 13:52:04'),
(16, 'Outside Test', 'Outside Test Desc', 'BS107', 1, 3, 6, 33.774009156538, -84.394620484884, '2015-02-22 18:11:58', '2015-02-22 19:02:04'),
(17, 'North Avenue Test', 'North Avenue Test Desc', 'BS109', 1, 2, 2, 33.770466, -84.3918093, '2015-02-22 19:04:24', '2015-02-22 19:04:24'),
(18, 'Meeting Test', 'Result: 5 blocks off', 'BS005', 1, 5, 5, 33.769238839526, -84.389310792889, '2015-02-23 12:35:01', '2015-02-23 12:40:32');

-- --------------------------------------------------------

--
-- Table structure for table `fm_layer`
--

CREATE TABLE IF NOT EXISTS `fm_layer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `desc` text NOT NULL,
  `type` int(11) NOT NULL,
  `icon` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `fm_layer`
--

INSERT INTO `fm_layer` (`id`, `name`, `desc`, `type`, `icon`) VALUES
(1, 'Apple', 'Apple Desc', 1, 'marker-apple-midnightblue.png'),
(2, 'Peach', 'Peach Desc', 1, 'marker-peach-midnightblue.png'),
(3, 'Grapes', 'Grapes Desc', 1, 'marker-grapes-midnightblue.png'),
(5, 'Berry', 'Berry Desc', 1, 'marker-berry-midnightblue.png'),
(6, 'Banana', 'Banana Desc', 1, 'marker-banana-midnightblue.png'),
(7, 'Tomato', 'Tomato Desc', 1, 'marker-tomato-midnightblue.png');

-- --------------------------------------------------------

--
-- Table structure for table `fm_picture`
--

CREATE TABLE IF NOT EXISTS `fm_picture` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `url` varchar(500) NOT NULL,
  `date` datetime NOT NULL,
  `update` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `fm_picture`
--

INSERT INTO `fm_picture` (`id`, `pid`, `name`, `url`, `date`, `update`) VALUES
(4, 1, 'Peach Tree 1', 'TestPicture1.JPG', '2015-01-25 00:00:00', '2015-01-25 21:01:52'),
(3, 1, 'Peach Tree 1', 'TestPicture2.JPG', '2013-01-25 00:00:00', '2015-01-25 21:03:56'),
(5, 1, 'Peach Tree 1', 'TestPicture3.JPG', '2014-10-05 00:58:00', '2015-01-25 00:58:32'),
(12, 1, 'Studio Photo 1', 'image.jpg', '2015-02-09 11:58:00', '2015-02-22 14:30:27'),
(13, 1, 'Studio Photo 2', 'image.jpg', '2015-02-09 12:53:00', '2015-02-22 14:30:25'),
(15, 1, 'Studio Photo 3', 'image_1.jpg', '2015-02-09 12:58:00', '2015-02-22 14:30:22'),
(16, 4, 'Spooky Man 1', 'SpookyMan.jpg', '2015-02-22 14:47:00', '2015-02-22 14:52:27'),
(17, 10, 'Mr. Gibbers', 'IMG_0026.JPG', '2015-02-22 14:48:00', '2015-02-22 14:49:05'),
(18, 5, 'Electric Flower 1', 'Electronic-Flower_Anim-Rendered01.jpg', '2015-02-22 14:49:00', '2015-02-22 14:50:24'),
(19, 5, 'Electric Flower 2', 'Electronic-Flower_Anim-Rendered03.jpg', '2015-02-22 14:50:00', '2015-02-22 14:50:55'),
(20, 3, 'Alice Font', 'Alice-Font_5Characters01.jpg', '2015-02-22 14:51:00', '2015-02-22 14:52:00'),
(21, 4, 'Spooky Man 2', 'SpookyMan03.jpg', '2015-02-22 14:52:00', '2015-02-22 14:52:25'),
(22, 2, 'Foraging Tech', 'ForagingTech_Image-Detection01.jpg', '2015-02-22 14:53:00', '2015-02-22 14:53:30');

-- --------------------------------------------------------

--
-- Table structure for table `fm_threshold`
--

CREATE TABLE IF NOT EXISTS `fm_threshold` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `min` float NOT NULL,
  `max` float NOT NULL,
  `date` datetime NOT NULL,
  `update` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `fm_threshold`
--

INSERT INTO `fm_threshold` (`id`, `pid`, `type`, `min`, `max`, `date`, `update`) VALUES
(1, 1, 1, 0, 100, '2015-03-19 14:50:00', '2015-02-22 13:06:10'),
(2, 2, 1, 0.5, 15, '2015-01-25 15:06:00', '2015-01-25 15:07:09'),
(4, 3, 1, 0.1, 35, '2015-03-25 22:58:00', '2015-01-25 22:58:52'),
(5, 5, 1, -20, 30, '2015-03-03 11:16:00', '2015-02-22 13:23:40'),
(6, 4, 1, 1, 500, '2015-03-07 22:05:00', '2015-02-08 22:06:51'),
(7, 7, 1, 10, 120, '2015-02-19 22:35:00', '2015-02-08 22:35:12'),
(8, 10, 1, 0, 250, '2015-03-27 14:17:00', '2015-02-22 14:17:28'),
(9, 20, 1, 0, 100, '2015-04-15 12:18:00', '2015-03-02 12:18:34'),
(10, 15, 1, 0, 1000, '2015-05-14 13:52:00', '2015-03-02 13:52:21');

-- --------------------------------------------------------

--
-- Table structure for table `fm_user`
--

CREATE TABLE IF NOT EXISTS `fm_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `password` varchar(64) NOT NULL,
  `salt` varchar(64) NOT NULL,
  `name` varchar(50) NOT NULL,
  `auth` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `fm_user`
--

INSERT INTO `fm_user` (`id`, `username`, `password`, `salt`, `name`, `auth`) VALUES
(1, 'foraging', 'foraging', 'foraging', 'foraging', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
