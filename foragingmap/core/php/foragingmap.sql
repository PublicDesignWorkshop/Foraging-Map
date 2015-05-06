-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2015 at 08:30 AM
-- Server version: 5.6.24
-- PHP Version: 5.5.24

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
) ENGINE=MyISAM AUTO_INCREMENT=3961 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fm_bend`
--

INSERT INTO `fm_bend` (`id`, `pid`, `type`, `value`, `date`, `update`) VALUES
(3957, 24, 1, 10, '2015-03-03 01:26:00', '2015-05-05 12:27:04'),
(3958, 24, 1, 50, '2015-04-07 01:27:00', '2015-05-05 12:27:16'),
(3959, 24, 1, 75, '2015-04-28 01:27:00', '2015-05-05 12:27:23'),
(3960, 24, 1, 100, '2015-05-01 01:27:00', '2015-05-05 12:27:33');

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
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fm_item`
--

INSERT INTO `fm_item` (`id`, `name`, `desc`, `serial`, `type`, `sort`, `amount`, `lat`, `lng`, `regdate`, `update`) VALUES
(24, 'Tomato', 'Small tomato next to my apartment', 'LS001', 1, 7, 10, 33.7772924363138, -84.3894195556641, '2015-04-30 11:18:54', '2015-05-05 20:34:29');

-- --------------------------------------------------------

--
-- Table structure for table `fm_layer`
--

CREATE TABLE IF NOT EXISTS `fm_layer` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `desc` text NOT NULL,
  `type` int(11) NOT NULL,
  `icon` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

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
  `id` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `url` varchar(500) NOT NULL,
  `date` datetime NOT NULL,
  `update` datetime NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fm_picture`
--

INSERT INTO `fm_picture` (`id`, `pid`, `name`, `url`, `date`, `update`) VALUES
(23, 24, 'Tomato Picture 1', 'TestPicture1.JPG', '2015-05-06 15:28:00', '2015-05-06 02:28:56');

-- --------------------------------------------------------

--
-- Table structure for table `fm_sensor`
--

CREATE TABLE IF NOT EXISTS `fm_sensor` (
  `id` int(11) NOT NULL,
  `initial` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fm_sensor`
--

INSERT INTO `fm_sensor` (`id`, `initial`, `name`) VALUES
(1, 'B', 'Bend'),
(2, 'T', 'Tension'),
(4, 'G', 'Gas');

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
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fm_threshold`
--

INSERT INTO `fm_threshold` (`id`, `pid`, `type`, `min`, `max`, `date`, `update`) VALUES
(14, 24, 1, 0, 100, '2015-04-30 11:57:00', '2015-05-05 12:27:44');

-- --------------------------------------------------------

--
-- Table structure for table `fm_user`
--

CREATE TABLE IF NOT EXISTS `fm_user` (
  `id` int(11) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(64) NOT NULL,
  `salt` varchar(64) NOT NULL,
  `name` varchar(50) NOT NULL,
  `auth` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fm_user`
--

INSERT INTO `fm_user` (`id`, `username`, `password`, `salt`, `name`, `auth`) VALUES
(1, 'foraging', 'foraging', 'foraging', 'foraging', 1);

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
-- Indexes for table `fm_sensor`
--
ALTER TABLE `fm_sensor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fm_threshold`
--
ALTER TABLE `fm_threshold`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fm_user`
--
ALTER TABLE `fm_user`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fm_bend`
--
ALTER TABLE `fm_bend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3961;
--
-- AUTO_INCREMENT for table `fm_item`
--
ALTER TABLE `fm_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `fm_layer`
--
ALTER TABLE `fm_layer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `fm_picture`
--
ALTER TABLE `fm_picture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `fm_sensor`
--
ALTER TABLE `fm_sensor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `fm_threshold`
--
ALTER TABLE `fm_threshold`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `fm_user`
--
ALTER TABLE `fm_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
