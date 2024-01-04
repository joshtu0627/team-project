create table review (
    id bigint unsigned auto_increment not null primary key,
    is_private int not null,
    star int not null,
    height decimal(4,1) not null,
    weight decimal(4,1) not null,
    style varchar(10) not null,
    size_review varchar(15) not null,
    review text,
    date varchar(20) not null,
    user_id bigint unsigned not null,
    product_id bigint unsigned not null,
    size varchar(5) not null,
    color_name varchar(20) not null,
    color_code varchar(10) not null,
    deleted integer default 0 not null,
    foreign key (product_id) references product(id),
    foreign key (user_id) references user(id)
);

create table review_emoji (
	id int auto_increment not null primary key,
    review_id bigint unsigned not null,
    user_id bigint unsigned not null,
    emoji varchar(15) not null,
    foreign key (review_id) references review(id),
    foreign key (user_id) references user(id)
);

INSERT INTO `order_table` VALUES ('1004', '1000', '1628648618609', '0', '{\"list\": [{\"id\": 201807201824, \"qty\": 1, \"size\": \"S\", \"color\": {\"code\": \"FFFFFF\", \"name\": \"White\"}, \"price\": 799}], \"total\": 799}', '10240', '799');

INSERT INTO `review` VALUES ('1', '0', '5', '170', '53', '合身', '合適', '白色很有質感', '2023-12-25', '1', '201807201824', 'M', '白色', '#FFFFFF', '0');
INSERT INTO `review` VALUES ('2', '0', '4', '157', '45', '合身', '合適', '沒有色差但送貨慢', '2024-01-04', '2', '201807201824', 'S', '亮綠', '#DDFFBB', '0');
INSERT INTO `review` VALUES ('3', '0', '3', '168', '43', '緊身', '太小', '尺寸有點太小', '2024-01-03', '3', '201807201824', 'M', '白色', '#FFFFFF', '0');
INSERT INTO `review` VALUES ('4', '0', '2', '161', '55', '寬鬆', '太大', '版型很怪', '2023-11-07', '4', '201807201824', 'M', '淺灰', '#CCCCCC', '0');
INSERT INTO `review` VALUES ('5', '0', '1', '153', '44', '合身', '太小', '跟圖片不一樣', '2024-11-09', '5', '201807201824', 'S', '淺灰', '#CCCCCC', '0');
INSERT INTO `review` VALUES ('6', '0', '5', '165', '47', '合身', '合適', 'nice', '2024-12-23', '10047', '201807201824', 'M', '淺灰', '#CCCCCC', '0');
INSERT INTO `review` VALUES ('7', '0', '5', '160', '50', '緊身', '合適', '賣家人很好', '2024-12-27', '10048', '201807201824', 'M', '白色', '#FFFFFF', '0');
INSERT INTO `review` VALUES ('8', '0', '5', '171', '54', '合身', '合適', '很喜歡', '2024-10-05', '10049', '201807201824', 'L', '淺灰', '#CCCCCC', '0');
INSERT INTO `review` VALUES ('9', '0', '4', '158', '46', '合身', '合適', '還行', '2024-09-23', '10050', '201807201824', 'S', '白色', '#FFFFFF', '0');
INSERT INTO `review` VALUES ('10', '0', '1', '160', '55', '合身', '太小', '實體和圖片差太多', '2024-04-30', '10051', '201807201824', 'M', '亮綠', '#DDFFBB', '0');

INSERT INTO `review_emoji` VALUES ('1', '1', '1', 'like');
INSERT INTO `review_emoji` VALUES ('2', '1', '2', 'like');
INSERT INTO `review_emoji` VALUES ('3', '1', '3', 'like');
INSERT INTO `review_emoji` VALUES ('4', '1', '4', 'love');
INSERT INTO `review_emoji` VALUES ('5', '1', '5', 'love');
INSERT INTO `review_emoji` VALUES ('6', '1', '10047', 'excited');
INSERT INTO `review_emoji` VALUES ('7', '1', '10048', 'excited');
INSERT INTO `review_emoji` VALUES ('8', '1', '10050', 'angry');
INSERT INTO `review_emoji` VALUES ('9', '2', '1', 'like');
INSERT INTO `review_emoji` VALUES ('10', '2', '2', 'like');
INSERT INTO `review_emoji` VALUES ('11', '2', '3', 'love');
INSERT INTO `review_emoji` VALUES ('12', '2', '4', 'love');
INSERT INTO `review_emoji` VALUES ('13', '2', '5', 'love');
INSERT INTO `review_emoji` VALUES ('14', '2', '10047', 'dislike');
INSERT INTO `review_emoji` VALUES ('15', '2', '10048', 'dislike');
INSERT INTO `review_emoji` VALUES ('16', '2', '10049', 'dislike');
INSERT INTO `review_emoji` VALUES ('17', '3', '1', 'like');
INSERT INTO `review_emoji` VALUES ('18', '3', '2', 'like');
INSERT INTO `review_emoji` VALUES ('19', '3', '3', 'excited');
INSERT INTO `review_emoji` VALUES ('20', '3', '4', 'excited');
INSERT INTO `review_emoji` VALUES ('21', '3', '5', 'excited');
INSERT INTO `review_emoji` VALUES ('22', '3', '10047', 'dislike');
INSERT INTO `review_emoji` VALUES ('23', '4', '1', 'excited');
INSERT INTO `review_emoji` VALUES ('24', '4', '2', 'excited');
INSERT INTO `review_emoji` VALUES ('25', '4', '3', 'love');
INSERT INTO `review_emoji` VALUES ('26', '4', '4', 'dislike');
INSERT INTO `review_emoji` VALUES ('27', '5', '1', 'excited');
INSERT INTO `review_emoji` VALUES ('28', '5', '2', 'excited');
INSERT INTO `review_emoji` VALUES ('29', '5', '3', 'excited');
INSERT INTO `review_emoji` VALUES ('30', '5', '4', 'like');
INSERT INTO `review_emoji` VALUES ('31', '6', '1', 'love');
INSERT INTO `review_emoji` VALUES ('32', '6', '2', 'love');
INSERT INTO `review_emoji` VALUES ('33', '6', '3', 'excited');
INSERT INTO `review_emoji` VALUES ('34', '6', '4', 'angry');
INSERT INTO `review_emoji` VALUES ('35', '7', '1', 'like');
INSERT INTO `review_emoji` VALUES ('36', '7', '2', 'love');
INSERT INTO `review_emoji` VALUES ('37', '8', '1', 'like');
INSERT INTO `review_emoji` VALUES ('38', '8', '2', 'excited');
INSERT INTO `review_emoji` VALUES ('39', '9', '1', 'like');
INSERT INTO `review_emoji` VALUES ('40', '9', '2', 'like');
INSERT INTO `review_emoji` VALUES ('41', '9', '3', 'like');
INSERT INTO `review_emoji` VALUES ('42', '10', '2', 'like');