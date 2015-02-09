-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2015 at 05:47 AM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `foragingmap`
--

-- --------------------------------------------------------

--
-- Table structure for table `fm_bend`
--

CREATE TABLE IF NOT EXISTS `fm_bend` (
`id` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `value` float NOT NULL,
  `date` datetime NOT NULL,
  `update` datetime NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fm_bend`
--

INSERT INTO `fm_bend` (`id`, `pid`, `type`, `value`, `date`, `update`) VALUES
(9, 1, 1, 8, '2015-01-13 23:11:00', '2015-01-24 23:11:00'),
(8, 1, 1, 5, '2014-12-17 23:10:00', '2015-01-24 23:11:00'),
(7, 1, 1, 3.2, '2014-11-11 23:10:00', '2015-01-25 00:57:35'),
(6, 1, 1, 1.5, '2014-10-06 23:10:00', '2015-01-24 23:49:39'),
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
(24, 5, 1, -10, '2015-01-26 00:16:00', '2015-01-26 11:17:25'),
(25, 5, 1, -8, '2015-01-26 01:16:00', '2015-01-26 11:17:49'),
(26, 5, 1, -6, '2015-01-26 02:18:00', '2015-01-26 11:18:17'),
(27, 5, 1, -4, '2015-01-26 04:18:00', '2015-01-26 11:18:28'),
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
(46, 5, 1, 56, '2015-01-26 23:07:00', '2015-01-26 12:08:04'),
(48, 1, 1, 13, '2015-02-02 17:05:53', '2015-02-02 17:05:53'),
(49, 1, 1, 15, '2015-02-02 17:25:24', '2015-02-02 17:25:24'),
(50, 4, 1, 469, '2015-02-03 09:47:36', '2015-02-03 09:47:36'),
(51, 1, 1, 10, '2015-02-03 13:43:11', '2015-02-03 13:43:11'),
(52, 4, 1, 320, '2015-02-08 22:04:00', '2015-02-08 22:04:35'),
(53, 7, 1, 30, '2015-02-08 22:34:00', '2015-02-08 22:35:05');

-- --------------------------------------------------------

--
-- Table structure for table `fm_item`
--

CREATE TABLE IF NOT EXISTS `fm_item` (
`id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `desc` text NOT NULL,
  `serial` varchar(16) NOT NULL,
  `type` int(11) NOT NULL,
  `sort` int(11) NOT NULL,
  `amount` float NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `regdate` datetime NOT NULL,
  `update` datetime NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fm_item`
--

INSERT INTO `fm_item` (`id`, `name`, `desc`, `serial`, `type`, `sort`, `amount`, `lat`, `lng`, `regdate`, `update`) VALUES
(1, 'Peach Tree 1', 'Peach Tree 1 Desc', 'BS001', 1, 3, 10, 33.762594540993, -84.390449523926, '2015-01-24 22:35:28', '2015-02-08 23:29:59'),
(2, 'Apple Tree 1', 'Apple Tree 1 Desc', 'BS002', 1, 2, 20, 33.773511179863, -84.396286010742, '2015-01-25 01:05:01', '2015-02-08 23:30:09'),
(3, 'Pear Tree 1', 'Pear Tree 1 Desc', 'BS003', 1, 3, 7, 33.773939255009, -84.377059936523, '2015-01-25 19:51:16', '2015-02-08 23:30:12'),
(4, 'Apple Tree 2', 'Apple Tree 2 Desc', 'BS005', 1, 2, 8, 33.777827506293, -84.386157989502, '2015-01-26 07:39:50', '2015-02-08 23:30:18'),
(5, 'Hourly Test Item', 'Hourly Test Item Desc', 'BS004', 1, 3, 23, 33.765377345713, -84.376630783081, '2015-01-26 11:16:12', '2015-02-08 23:30:15'),
(9, 'New Item', 'New Item Desc', 'BS006', 1, 5, 1, 33.753032420842, -84.382810592651, '2015-02-08 23:33:27', '2015-02-08 23:43:12');

-- --------------------------------------------------------

--
-- Table structure for table `fm_layer`
--

CREATE TABLE IF NOT EXISTS `fm_layer` (
`id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `desc` text NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fm_layer`
--

INSERT INTO `fm_layer` (`id`, `name`, `desc`, `type`) VALUES
(1, 'Apple', 'Apple Desc', 1),
(2, 'Peach', 'Peach Desc', 1),
(3, 'Grapes', 'Grapes Desc', 1),
(5, 'Banana', 'Banana Desc', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fm_picture`
--

CREATE TABLE IF NOT EXISTS `fm_picture` (
`id` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `url` varchar(500) NOT NULL,
  `date` datetime NOT NULL,
  `update` datetime NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fm_picture`
--

INSERT INTO `fm_picture` (`id`, `pid`, `name`, `url`, `date`, `update`) VALUES
(4, 1, 'Peach Tree 1', 'TestPicture1.JPG', '2015-01-25 00:00:00', '2015-01-25 21:01:52'),
(3, 1, 'Peach Tree 1', 'TestPicture2.JPG', '2013-01-25 00:00:00', '2015-01-25 21:03:56'),
(5, 1, 'Peach Tree 1', 'TestPicture3.JPG', '2014-10-05 00:58:00', '2015-01-25 00:58:32');

-- --------------------------------------------------------

--
-- Table structure for table `fm_threshold`
--

CREATE TABLE IF NOT EXISTS `fm_threshold` (
`id` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `min` float NOT NULL,
  `max` float NOT NULL,
  `date` datetime NOT NULL,
  `update` datetime NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fm_threshold`
--

INSERT INTO `fm_threshold` (`id`, `pid`, `type`, `min`, `max`, `date`, `update`) VALUES
(1, 1, 1, 2, 10, '2015-01-25 14:50:38', '2015-01-25 14:50:43'),
(2, 2, 1, 0.5, 15, '2015-01-25 15:06:00', '2015-01-25 15:07:09'),
(4, 3, 1, 0.1, 35, '2015-03-25 22:58:00', '2015-01-25 22:58:52'),
(5, 5, 1, -10, 30, '2015-03-03 11:16:00', '2015-01-26 11:16:44'),
(6, 4, 1, 1, 500, '2015-03-07 22:05:00', '2015-02-08 22:06:51'),
(7, 7, 1, 10, 120, '2015-02-19 22:35:00', '2015-02-08 22:35:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fm_bend`
--
ALTER TABLE `fm_bend`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fm_item`
--
ALTER TABLE `fm_item`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `serial` (`serial`);

--
-- Indexes for table `fm_layer`
--
ALTER TABLE `fm_layer`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fm_picture`
--
ALTER TABLE `fm_picture`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fm_threshold`
--
ALTER TABLE `fm_threshold`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fm_bend`
--
ALTER TABLE `fm_bend`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=54;
--
-- AUTO_INCREMENT for table `fm_item`
--
ALTER TABLE `fm_item`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `fm_layer`
--
ALTER TABLE `fm_layer`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `fm_picture`
--
ALTER TABLE `fm_picture`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `fm_threshold`
--
ALTER TABLE `fm_threshold`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
