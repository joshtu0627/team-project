# 轉儲表 review
# ------------------------------------------------------------
DROP TABLE IF EXISTS `review`;
create table `review` (
    `id` bigint unsigned auto_increment not null primary key,
    `is_private` int not null,
    `star` int not null,
    `height` decimal(4,1) not null,
    `weight` decimal(4,1) not null,
    `style` varchar(10) not null,
    `size_review` varchar(15) not null,
    `review` text,
    `date` varchar(20) not null,
    `user_id` bigint unsigned not null,
    `product_id` bigint unsigned not null,
    `size` varchar(5) not null,
    `color_name` varchar(20) not null,
    `color_code` varchar(10) not null,
    `deleted` integer default 0 not null,
    foreign key (product_id) references product(id),
    foreign key (user_id) references user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;