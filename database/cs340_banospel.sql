-- phpMyAdmin SQL Dump
-- version 5.1.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 16, 2022 at 09:03 PM
-- Server version: 10.6.5-MariaDB-log
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_banospel`
--

-- --------------------------------------------------------

--
-- Table structure for table `cashiers`
--

CREATE TABLE `cashiers` (
  `cashier_id` int(6) NOT NULL,
  `cashier_first` varchar(50) NOT NULL,
  `cashier_last` varchar(50) NOT NULL,
  `hourly_rate` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `cashiers`
--

INSERT INTO `cashiers` (`cashier_id`, `cashier_first`, `cashier_last`, `hourly_rate`) VALUES
(750235, 'Monica', 'Geller', 22.5),
(750236, 'Chandler', 'Bing', 18.5),
(750237, 'Regina', 'Philange', 20.75);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(6) NOT NULL,
  `customer_last` varchar(50) NOT NULL,
  `customer_first` varchar(50) NOT NULL,
  `street` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `zip` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `customer_last`, `customer_first`, `street`, `email`, `city`, `state`, `zip`) VALUES
(159263, 'Geller', 'Ross', '27 Madison', 'rgeller@yahoo.com', 'New York', 'NY', 10019),
(159264, 'Green', 'Rachel', '23 Park Ave', 'rachelgrn@gmail.com', 'New York', 'NY', 10016),
(159265, 'Buffay', 'Phoebe', '806 Jefferson', 'phoebo@sbcglobal.net', 'New York', 'NY', 10019);

-- --------------------------------------------------------

--
-- Table structure for table `invoiceItems`
--

CREATE TABLE `invoiceItems` (
  `invoiceItem_id` int(6) NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `plant_id` int(11) NOT NULL,
  `plant_quantity` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `invoiceItems`
--

INSERT INTO `invoiceItems` (`invoiceItem_id`, `invoice_id`, `plant_id`, `plant_quantity`) VALUES
(110000, 100000, 4563, 5),
(110001, 100001, 4562, 2),
(110002, 100001, 4563, 1),
(110003, 100003, 4562, 4),
(110004, 100003, 4565, 1);

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `invoice_id` int(6) NOT NULL,
  `customer_id` int(6) NOT NULL,
  `cashier_id` int(3) NOT NULL,
  `total_price` float NOT NULL,
  `invoice_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`invoice_id`, `customer_id`, `cashier_id`, `total_price`, `invoice_date`) VALUES
(100000, 159263, 750237, 62.5, '2022-01-11'),
(100001, 159264, 750236, 58.4, '2022-02-03'),
(100003, 159265, 750235, 100.55, '2022-02-14');

-- --------------------------------------------------------

--
-- Table structure for table `plants`
--

CREATE TABLE `plants` (
  `plant_id` int(4) NOT NULL,
  `plant_name` varchar(50) NOT NULL,
  `plant_price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `plants`
--

INSERT INTO `plants` (`plant_id`, `plant_name`, `plant_price`) VALUES
(4562, 'Easter Cactus', 22.95),
(4563, 'Moon Cactus', 12.5),
(4565, 'Star Cactus', 8.75);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cashiers`
--
ALTER TABLE `cashiers`
  ADD PRIMARY KEY (`cashier_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `invoiceItems`
--
ALTER TABLE `invoiceItems`
  ADD PRIMARY KEY (`invoiceItem_id`),
  ADD KEY `invoiceItems_invoice_id_fk` (`invoice_id`),
  ADD KEY `invoiceItems_plant_id_fk` (`plant_id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`invoice_id`),
  ADD KEY `invoices_customer_id_fk` (`customer_id`),
  ADD KEY `invoices_cashier_id_fk` (`cashier_id`);

--
-- Indexes for table `plants`
--
ALTER TABLE `plants`
  ADD PRIMARY KEY (`plant_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cashiers`
--
ALTER TABLE `cashiers`
  MODIFY `cashier_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=750239;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159266;

--
-- AUTO_INCREMENT for table `invoiceItems`
--
ALTER TABLE `invoiceItems`
  MODIFY `invoiceItem_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110005;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `invoice_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100004;

--
-- AUTO_INCREMENT for table `plants`
--
ALTER TABLE `plants`
  MODIFY `plant_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4566;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `invoiceItems`
--
ALTER TABLE `invoiceItems`
  ADD CONSTRAINT `invoiceItems_invoice_id_fk` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`invoice_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invoiceItems_plant_id_fk` FOREIGN KEY (`plant_id`) REFERENCES `plants` (`plant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_cashier_id_fk` FOREIGN KEY (`cashier_id`) REFERENCES `cashiers` (`cashier_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invoices_customer_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
