-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 18, 2019 at 04:53 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nitrutsa_nu2019`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(3) NOT NULL,
  `userid` varchar(200) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  `access` int(3) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `userid`, `pwd`, `access`) VALUES
(1, 'malkhansinghrathaur@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 1),
(2, 'malkhan', '827ccb0eea8a706c4c34a16891f84e7b', 3);

-- --------------------------------------------------------

--
-- Table structure for table `campus_ambassador`
--

CREATE TABLE `campus_ambassador` (
  `ca_id` int(11) NOT NULL,
  `ca_name` varchar(30) NOT NULL,
  `ca_contact` varchar(10) NOT NULL,
  `ca_email` varchar(20) NOT NULL,
  `ca_college` varchar(20) NOT NULL,
  `ca_fb` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `campus_ambassador`
--

INSERT INTO `campus_ambassador` (`ca_id`, `ca_name`, `ca_contact`, `ca_email`, `ca_college`, `ca_fb`) VALUES
(1, 'Malkhan Singh', '7978282568', 'malkhansinghrathaur@', 'NITR', 'qwerty');

-- --------------------------------------------------------

--
-- Table structure for table `coordinator`
--

CREATE TABLE `coordinator` (
  `id` int(3) NOT NULL,
  `c_id` varchar(100) NOT NULL,
  `pwd` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `eid` int(11) NOT NULL,
  `category` varchar(50) NOT NULL,
  `name` varchar(1000) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `venue` varchar(1000) NOT NULL,
  `coordinator1` text NOT NULL,
  `coordinator2` text NOT NULL,
  `number1` varchar(10) NOT NULL,
  `number2` varchar(10) NOT NULL,
  `description` text NOT NULL,
  `rules` text NOT NULL,
  `criteria` text NOT NULL,
  `image` varchar(2000) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`eid`, `category`, `name`, `date`, `time`, `venue`, `coordinator1`, `coordinator2`, `number1`, `number2`, `description`, `rules`, `criteria`, `image`) VALUES
(13, 'workshop', 'hello', '2019-02-01', '12:59:00', 'LA', 'Malkhan Singh', 'S Singh', '7978282568', '1234567890', 'qwrt', 'qwf', 'fsfasd', '2.jpg'),
(14, 'workshop', 'This is test event', '2019-01-08', '07:18:00', 'LA', 'Malkhan Singh', 'Malkhan Singh', '7978282568', '7978256809', '<h1>ROS_Web_Controller</h1>\r\n<p>Control your ROS based bot from a browser.</p>\r\n<h1><a id=\"user-content-web-interface\" class=\"anchor\" href=\"https://github.com/Malkhan52/ROS_Web_Controller#web-interface\" aria-hidden=\"true\"></a>Web Interface</h1>\r\n<p>This is the web interface to control ros based bot. Using this web-UI we can control bot from any modern browser and from any type of device having browser.</p>\r\n<h3><a id=\"user-content-dependencies\" class=\"anchor\" href=\"https://github.com/Malkhan52/ROS_Web_Controller#dependencies\" aria-hidden=\"true\"></a>Dependencies</h3>\r\n<ul>\r\n<li>\r\n<p>rosbridge_suite(<a href=\"http://wiki.ros.org/rosbridge_suite\" rel=\"nofollow\">http://wiki.ros.org/rosbridge_suite</a>) -&nbsp;<code>sudo apt-get install ros-kinetic-rosbridge-server</code></p>\r\n</li>\r\n<li>\r\n<p>async_web_server_cpp - download package from&nbsp;<a href=\"https://github.com/GT-RAIL/async_web_server_cpp\">https://github.com/GT-RAIL/async_web_server_cpp</a>&nbsp;(web_video_server package depends on this package).</p>\r\n</li>\r\n<li>\r\n<p>web_video_server(<a href=\"http://wiki.ros.org/web_video_server\" rel=\"nofollow\">http://wiki.ros.org/web_video_server</a>) - download package from&nbsp;<a href=\"https://github.com/RobotWebTools/web_video_server\">https://github.com/RobotWebTools/web_video_server</a>&nbsp;and build it.</p>\r\n</li>\r\n<li>\r\n<p>Localhost(apche2) -&nbsp;<code>sudo apt-get install apache2</code>&nbsp;(check it, from browser&nbsp;<a href=\"http://localhost/\" rel=\"nofollow\">http://localhost</a>, this will show Apache2 Ubuntu Default Page)</p>\r\n</li>\r\n</ul>\r\n<h4><a id=\"user-content-setup-steps\" class=\"anchor\" href=\"https://github.com/Malkhan52/ROS_Web_Controller#setup-steps\" aria-hidden=\"true\"></a>Setup steps</h4>\r\n<ol>\r\n<li>\r\n<p>move this folder(ros_web_controller) to \'/var/www/html/\' (&nbsp;<code>sudo cp -r &lt;path to ros_web_controller&gt; /var/www/html/</code>)</p>\r\n</li>\r\n<li>\r\n<p>run these packages in local device: roscore, roslaunch rosbridge_server rosbridge_websocket.launch, rosrun web_video_server web_video_server.</p>\r\n</li>\r\n<li>\r\n<p>Now, open any modern browser and type \'<a href=\"http://ip/\" rel=\"nofollow\">http://ip</a>&nbsp;address/this project\'.</p>\r\n</li>\r\n<li>\r\n<p>To open in other devices, connect both devices with the same network and use the above address to view the web page.</p>\r\n</li>\r\n</ol>\r\n<h2><a id=\"user-content-features\" class=\"anchor\" href=\"https://github.com/Malkhan52/ROS_Web_Controller#features\" aria-hidden=\"true\"></a>Features</h2>\r\n<ol>\r\n<li><em>Start/Stop</em>&nbsp;new topic (For now only predefined topics can be started)</li>\r\n<li>Subscribe to any topic</li>\r\n<li>View live camera stream</li>\r\n<li>Get a list of all topics</li>\r\n<li>Get logs of topics to debug</li>\r\n<li>Publish values using sliders.</li>\r\n</ol>\r\n<h2><a id=\"user-content-todo\" class=\"anchor\" href=\"https://github.com/Malkhan52/ROS_Web_Controller#todo\" aria-hidden=\"true\"></a>ToDo</h2>\r\n<ol>\r\n<li><em>Start/Stop</em>&nbsp;required topic</li>\r\n<li>Publish any required topic</li>\r\n<li>Enhance UI/UX</li>\r\n<li>Add more features like rqtplot 2d and 3d.</li>\r\n<li>Get Gazebo view in browser</li>\r\n</ol>', '<h1>ROS_Web_Controller</h1>\r\n<p>Control your ROS based bot from a browser.</p>\r\n<h1><a id=\"user-content-web-interface\" class=\"anchor\" href=\"https://github.com/Malkhan52/ROS_Web_Controller#web-interface\" aria-hidden=\"true\"></a>Web Interface</h1>\r\n<p>This is the web interface to control ros based bot. Using this web-UI we can control bot from any modern browser and from any type of device having browser.</p>\r\n<h3><a id=\"user-content-dependencies\" class=\"anchor\" href=\"https://github.com/Malkhan52/ROS_Web_Controller#dependencies\" aria-hidden=\"true\"></a>Dependencies</h3>\r\n<ul>\r\n<li>\r\n<p>rosbridge_suite(<a href=\"http://wiki.ros.org/rosbridge_suite\" rel=\"nofollow\">http://wiki.ros.org/rosbridge_suite</a>) -&nbsp;<code>sudo apt-get install ros-kinetic-rosbridge-server</code></p>\r\n</li>\r\n<li>\r\n<p>async_web_server_cpp - download package from&nbsp;<a href=\"https://github.com/GT-RAIL/async_web_server_cpp\">https://github.com/GT-RAIL/async_web_server_cpp</a>&nbsp;(web_video_server package depends on this package).</p>\r\n</li>\r\n<li>\r\n<p>web_video_server(<a href=\"http://wiki.ros.org/web_video_server\" rel=\"nofollow\">http://wiki.ros.org/web_video_server</a>) - download package from&nbsp;<a href=\"https://github.com/RobotWebTools/web_video_server\">https://github.com/RobotWebTools/web_video_server</a>&nbsp;and build it.</p>\r\n</li>\r\n<li>\r\n<p>Localhost(apche2) -&nbsp;<code>sudo apt-get install apache2</code>&nbsp;(check it, from browser&nbsp;<a href=\"http://localhost/\" rel=\"nofollow\">http://localhost</a>, this will show Apache2 Ubuntu Default Page)</p>\r\n</li>\r\n</ul>\r\n<h4><a id=\"user-content-setup-steps\" class=\"anchor\" href=\"https://github.com/Malkhan52/ROS_Web_Controller#setup-steps\" aria-hidden=\"true\"></a>Setup steps</h4>\r\n<ol>\r\n<li>\r\n<p>move this folder(ros_web_controller) to \'/var/www/html/\' (&nbsp;<code>sudo cp -r &lt;path to ros_web_controller&gt; /var/www/html/</code>)</p>\r\n</li>\r\n<li>\r\n<p>run these packages in local device: roscore, roslaunch rosbridge_server rosbridge_websocket.launch, rosrun web_video_server web_video_server.</p>\r\n</li>\r\n<li>\r\n<p>Now, open any modern browser and type \'<a href=\"http://ip/\" rel=\"nofollow\">http://ip</a>&nbsp;address/this project\'.</p>\r\n</li>\r\n<li>\r\n<p>To open in other devices, connect both devices with the same network and use the above address to view the web page.</p>\r\n</li>\r\n</ol>\r\n<h2><a id=\"user-content-features\" class=\"anchor\" href=\"https://github.com/Malkhan52/ROS_Web_Controller#features\" aria-hidden=\"true\"></a>Features</h2>\r\n<ol>\r\n<li><em>Start/Stop</em>&nbsp;new topic (For now only predefined topics can be started)</li>\r\n<li>Subscribe to any topic</li>\r\n<li>View live camera stream</li>\r\n<li>Get a list of all topics</li>\r\n<li>Get logs of topics to debug</li>\r\n<li>Publish values using sliders.</li>\r\n</ol>\r\n<h2><a id=\"user-content-todo\" class=\"anchor\" href=\"https://github.com/Malkhan52/ROS_Web_Controller#todo\" aria-hidden=\"true\"></a>ToDo</h2>\r\n<ol>\r\n<li><em>Start/Stop</em>&nbsp;required topic</li>\r\n<li>Publish any required topic</li>\r\n<li>Enhance UI/UX</li>\r\n<li>Add more features like rqtplot 2d and 3d.</li>\r\n<li>Get Gazebo view in browser</li>\r\n</ol>', '<h1>ROS_Web_Controller</h1>\r\n<p>Control your ROS based bot from a browser.</p>\r\n<h1><a id=\"user-content-web-interface\" class=\"anchor\" href=\"https://github.com/Malkhan52/ROS_Web_Controller#web-interface\" aria-hidden=\"true\"></a>Web Interface</h1>\r\n<p>This is the web interface to control ros based bot. Using this web-UI we can control bot from any modern browser and from any type of device having browser.</p>\r\n<h3><a id=\"user-content-dependencies\" class=\"anchor\" href=\"https://github.com/Malkhan52/ROS_Web_Controller#dependencies\" aria-hidden=\"true\"></a>Dependencies</h3>\r\n<ul>\r\n<li>\r\n<p>rosbridge_suite(<a href=\"http://wiki.ros.org/rosbridge_suite\" rel=\"nofollow\">http://wiki.ros.org/rosbridge_suite</a>) -&nbsp;<code>sudo apt-get install ros-kinetic-rosbridge-server</code></p>\r\n</li>\r\n<li>\r\n<p>async_web_server_cpp - download package from&nbsp;<a href=\"https://github.com/GT-RAIL/async_web_server_cpp\">https://github.com/GT-RAIL/async_web_server_cpp</a>&nbsp;(web_video_server package depends on this package).</p>\r\n</li>\r\n<li>\r\n<p>web_video_server(<a href=\"http://wiki.ros.org/web_video_server\" rel=\"nofollow\">http://wiki.ros.org/web_video_server</a>) - download package from&nbsp;<a href=\"https://github.com/RobotWebTools/web_video_server\">https://github.com/RobotWebTools/web_video_server</a>&nbsp;and build it.</p>\r\n</li>\r\n<li>\r\n<p>Localhost(apche2) -&nbsp;<code>sudo apt-get install apache2</code>&nbsp;(check it, from browser&nbsp;<a href=\"http://localhost/\" rel=\"nofollow\">http://localhost</a>, this will show Apache2 Ubuntu Default Page)</p>\r\n</li>\r\n</ul>\r\n<h4><a id=\"user-content-setup-steps\" class=\"anchor\" href=\"https://github.com/Malkhan52/ROS_Web_Controller#setup-steps\" aria-hidden=\"true\"></a>Setup steps</h4>\r\n<ol>\r\n<li>\r\n<p>move this folder(ros_web_controller) to \'/var/www/html/\' (&nbsp;<code>sudo cp -r &lt;path to ros_web_controller&gt; /var/www/html/</code>)</p>\r\n</li>\r\n<li>\r\n<p>run these packages in local device: roscore, roslaunch rosbridge_server rosbridge_websocket.launch, rosrun web_video_server web_video_server.</p>\r\n</li>\r\n<li>\r\n<p>Now, open any modern browser and type \'<a href=\"http://ip/\" rel=\"nofollow\">http://ip</a>&nbsp;address/this project\'.</p>\r\n</li>\r\n<li>\r\n<p>To open in other devices, connect both devices with the same network and use the above address to view the web page.</p>\r\n</li>\r\n</ol>\r\n<h2><a id=\"user-content-features\" class=\"anchor\" href=\"https://github.com/Malkhan52/ROS_Web_Controller#features\" aria-hidden=\"true\"></a>Features</h2>\r\n<ol>\r\n<li><em>Start/Stop</em>&nbsp;new topic (For now only predefined topics can be started)</li>\r\n<li>Subscribe to any topic</li>\r\n<li>View live camera stream</li>\r\n<li>Get a list of all topics</li>\r\n<li>Get logs of topics to debug</li>\r\n<li>Publish values using sliders.</li>\r\n</ol>\r\n<h2><a id=\"user-content-todo\" class=\"anchor\" href=\"https://github.com/Malkhan52/ROS_Web_Controller#todo\" aria-hidden=\"true\"></a>ToDo</h2>\r\n<ol>\r\n<li><em>Start/Stop</em>&nbsp;required topic</li>\r\n<li>Publish any required topic</li>\r\n<li>Enhance UI/UX</li>\r\n<li>Add more features like rqtplot 2d and 3d.</li>\r\n<li>Get Gazebo view in browser</li>\r\n</ol>', '1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(10) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `contact` text,
  `gender` varchar(8) DEFAULT NULL,
  `college` text,
  `checkin` varchar(20) DEFAULT NULL,
  `paid` varchar(20) DEFAULT NULL,
  `pwd` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `name`, `email`, `contact`, `gender`, `college`, `checkin`, `paid`, `pwd`) VALUES
(1, 'Malkhan Singh', 'malkhansinghrathaur@gmail.com', '2147483647', 'male', 'NITR', '1', '1', '827ccb0eea8a706c4c34a16891f84e7b'),
(2, 'Swapnil Sahoo', 'swapnil.vishal@gmail.com', '2147483647', 'male', 'NIT Rourkela ', '1', '0', '25f9e794323b453885f5181f1b624d0b'),
(3, 'test1', 'test1', '1234', 'male', 'NITR', '1', '1', '81dc9bdb52d04dc20036dbd8313ed055'),
(4, 'test12', 'testt@gmail.com', '2147483647', 'male', 'NITR', '1', '0', '827ccb0eea8a706c4c34a16891f84e7b'),
(5, 'qwerty', 'qwerty@gmail.com', '7978282568', 'male', 'czcsd', NULL, NULL, 'e10adc3949ba59abbe56e057f20f883e'),
(6, 'dsfsfs', 'fsfsfsfs@gmail.com', '7978282568', 'male', 'ss', NULL, NULL, 'b4f86c635ed8c810cbe199e23401c02b');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `campus_ambassador`
--
ALTER TABLE `campus_ambassador`
  ADD PRIMARY KEY (`ca_id`);

--
-- Indexes for table `coordinator`
--
ALTER TABLE `coordinator`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`eid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `campus_ambassador`
--
ALTER TABLE `campus_ambassador`
  MODIFY `ca_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `coordinator`
--
ALTER TABLE `coordinator`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `eid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
