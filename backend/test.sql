/*!40000 ALTER TABLE `variant` ENABLE KEYS */;
UNLOCK TABLES;

# 轉儲表 checkin
# ------------------------------------------------------------
DROP TABLE IF EXISTS `checkin`;
CREATE TABLE `checkin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `year` int DEFAULT NULL,
  `month` int DEFAULT NULL,
  `day` int DEFAULT NULL,
  `conday` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `checkin_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

LOCK TABLES `checkin` WRITE;
/*!40000 ALTER TABLE `checkin` DISABLE KEYS */;

INSERT INTO `checkin` (`id`, `user_id`, `year`, `month`, `day`, `conday`)
VALUES
	(1,10064,2023,5,3,1),
	(2,10064,2023,5,4,2),
	(3,10064,2023,5,5,3),
	(4,10064,2023,5,6,4),
	(5,10064,2023,5,7,5),
	(6,10064,2023,5,9,1);

/*!40000 ALTER TABLE `checkin` ENABLE KEYS */;
UNLOCK TABLES;


# 轉儲表 favorite
# ------------------------------------------------------------
DROP TABLE IF EXISTS `favorite`;
CREATE TABLE `favorite` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `favorite_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `favorite_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;

INSERT INTO `favorite` (`id`, `user_id`, `product_id`)
VALUES
	(1,10064, 201807242216),
	(2,10064, 201807242234),
	(3,10064, 201902191210);

/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;



# 轉儲表 reward
# ------------------------------------------------------------
-- DROP TABLE IF EXISTS `reward`;
-- CREATE TABLE `reward` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `title` varchar(100),
--   `description` varchar(100),
--   `value` decimal(10,2),
--   PRIMARY KEY (`id`)
--  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


LOCK TABLES `reward` WRITE;
/*!40000 ALTER TABLE `reward` DISABLE KEYS */;

INSERT INTO `reward` (`id`, `title`, `description`, `value`)
VALUES
	(1,"Login Reward", "Random reward", 10.00),
	(2,"Login Reward", "Random reward", 20.00),
	(3,"Login Reward", "Random reward", 30.00),
	(4,"Login Reward", "Random reward", 40.00),
	(5,"Login Reward", "Random reward", 50.00),
	(6,"Login Reward", "Random reward", 60.00),
	(0,"Seven Days Reward", "Special", 200.00);

/*!40000 ALTER TABLE `reward` ENABLE KEYS */;
UNLOCK TABLES;



# 轉儲表 rewardrecord
# ------------------------------------------------------------
DROP TABLE IF EXISTS `rewardrecord`;
CREATE TABLE `rewardrecord` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `reward_id` int NOT NULL,
  `used` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `rewardrecord_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `rewardrecord_ibfk_2` FOREIGN KEY (`reward_id`) REFERENCES `reward` (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


LOCK TABLES `rewardrecord` WRITE;
/*!40000 ALTER TABLE `rewardrecord` DISABLE KEYS */;

INSERT INTO `rewardrecord` (`id`, `user_id`, `reward_id`, `used`)
VALUES
	(1,10241, 1, 0),
	(2,10241, 1, 0);

/*!40000 ALTER TABLE `rewardrecord` ENABLE KEYS */;
UNLOCK TABLES;




