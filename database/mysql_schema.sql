/* SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO"; */
/* SET AUTOCOMMIT = 0; */
/* START TRANSACTION; */
/* SET time_zone = "+00:00"; */

-- --------------------------------------------------------

--
-- Table structure for table `ApiResponse` generated from model 'ApiResponse'
--

CREATE TABLE IF NOT EXISTS `ApiResponse` (
  `code` INT DEFAULT NULL,
  `type` TEXT DEFAULT NULL,
  `message` TEXT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `Category` generated from model 'Category'
--

CREATE TABLE IF NOT EXISTS `Category` (
  `id` BIGINT DEFAULT NULL,
  `name` TEXT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `inline_object` generated from model 'inlineUnderscoreobject'
--

CREATE TABLE IF NOT EXISTS `inline_object` (
  `name` TEXT DEFAULT NULL COMMENT 'Updated name of the pet',
  `status` TEXT DEFAULT NULL COMMENT 'Updated status of the pet'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `inline_object_1` generated from model 'inlineUnderscoreobjectUnderscore1'
--

CREATE TABLE IF NOT EXISTS `inline_object_1` (
  `additionalMetadata` TEXT DEFAULT NULL COMMENT 'Additional data to pass to server',
  `file` MEDIUMBLOB DEFAULT NULL COMMENT 'file to upload'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `Order` generated from model 'Order'
--

CREATE TABLE IF NOT EXISTS `Order` (
  `id` BIGINT DEFAULT NULL,
  `petId` BIGINT DEFAULT NULL,
  `quantity` INT DEFAULT NULL,
  `shipDate` DATETIME DEFAULT NULL,
  `status` ENUM('placed', 'approved', 'delivered') DEFAULT NULL COMMENT 'Order Status',
  `complete` TINYINT(1) DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `Pet` generated from model 'Pet'
--

CREATE TABLE IF NOT EXISTS `Pet` (
  `id` BIGINT DEFAULT NULL,
  `category` TEXT DEFAULT NULL,
  `name` TEXT NOT NULL,
  `photoUrls` JSON NOT NULL,
  `tags` JSON DEFAULT NULL,
  `status` ENUM('available', 'pending', 'sold') DEFAULT NULL COMMENT 'pet status in the store'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `Tag` generated from model 'Tag'
--

CREATE TABLE IF NOT EXISTS `Tag` (
  `id` BIGINT DEFAULT NULL,
  `name` TEXT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `User` generated from model 'User'
--

CREATE TABLE IF NOT EXISTS `User` (
  `id` BIGINT DEFAULT NULL,
  `username` TEXT DEFAULT NULL,
  `firstName` TEXT DEFAULT NULL,
  `lastName` TEXT DEFAULT NULL,
  `email` TEXT DEFAULT NULL,
  `password` TEXT DEFAULT NULL,
  `phone` TEXT DEFAULT NULL,
  `userStatus` INT DEFAULT NULL COMMENT 'User Status'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

