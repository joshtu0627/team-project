CREATE TABLE `story` (
  `id` int NOT NULL AUTO_INCREMENT,
  `picUrl` varchar(200) NOT NULL,
  `purchase_url` varchar(200) NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;