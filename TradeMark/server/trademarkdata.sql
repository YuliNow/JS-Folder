/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100504
 Source Host           : localhost:3306
 Source Schema         : trademarkdata

 Target Server Type    : MySQL
 Target Server Version : 100504
 File Encoding         : 65001

 Date: 29/03/2021 15:12:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for business
-- ----------------------------
DROP TABLE IF EXISTS `business`;
CREATE TABLE `business`  (
  `order_id` int(11) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT '主ID 索引',
  `account` char(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '登录用户,跟用户表进行外键绑定',
  `applicant_type` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '申请人类型 1.企业/单位申请2.自然人3.其他',
  `applicant_name` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '申请人姓名/主题名称',
  `valid_license` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '有效执照 1.身份证 2.营业执照3.其他',
  `certificate_ID` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '执照号码/证件号码',
  `certificate_type` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '证件类型 1.身份证 2.营业执照',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '地址信息',
  `identity` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '所属省份',
  `city` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '所属城市',
  `EN_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '英文名称',
  `legal_person` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '企业法人',
  `EN_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '英文地址',
  `applicant_nationality` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '申请人国籍/地区',
  `postal_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮政编码',
  `contacts` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '联系人',
  `agency_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '代理机构名称',
  `domestic_recipients` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '外国申请人的国内接收人',
  `application_country` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '申请/展出国家/地区',
  `application_date` datetime(0) NOT NULL COMMENT '申请日期',
  `application_instructions` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商标申请说明',
  `trademark_info` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商标说明',
  `trademark_type_id` int NOT NULL COMMENT '商标类别编号',
  `nets` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '办理网点',
  `business_type` int NOT NULL COMMENT '业务类型',
  `status` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '审核状态 1.审核中,2.审核完成,3.审核失败4.预约成功',
  PRIMARY KEY (`order_id`) USING BTREE,
  INDEX `business_type`(`business_type`) USING BTREE,
  INDEX `account`(`account`) USING BTREE,
  CONSTRAINT `business_type` FOREIGN KEY (`business_type`) REFERENCES `businesstype` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `account` FOREIGN KEY (`account`) REFERENCES `userdata` (`account`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of business
-- ----------------------------
INSERT INTO `business` VALUES (00000000001, 'test1', '1', '张三', '1', '42280119960823183X', '1', '四川省成都市', '四川省', '成都市', NULL, NULL, NULL, NULL, NULL, '老王', '高新区理事中心', 'Jerry', 'Japan', '2021-03-21 00:00:00', '暂无申请说明', '商标暂无说明', 1, '暂无', 1, '1');

-- ----------------------------
-- Table structure for businesstype
-- ----------------------------
DROP TABLE IF EXISTS `businesstype`;
CREATE TABLE `businesstype`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `business_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '业务名称',
  `business_info` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '申请须知',
  `business_id` char(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '业务ID',
  PRIMARY KEY (`id`, `business_name`, `business_id`) USING BTREE,
  INDEX `business_name`(`business_name`) USING BTREE,
  INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 41 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of businesstype
-- ----------------------------
INSERT INTO `businesstype` VALUES (1, '业务1', '时间紧迫，来不及录数据，业务名称唯一', '00001');
INSERT INTO `businesstype` VALUES (2, '业务2', '时间紧迫，来不及录数据，业务名称唯一', '00002');
INSERT INTO `businesstype` VALUES (3, '业务3', '时间紧迫，来不及录数据，业务名称唯一', '00003');
INSERT INTO `businesstype` VALUES (4, '业务4', '时间紧迫，来不及录数据，业务名称唯一', '00004');
INSERT INTO `businesstype` VALUES (5, '业务5', '时间紧迫，来不及录数据，业务名称唯一', '00005');
INSERT INTO `businesstype` VALUES (6, '业务6', '时间紧迫，来不及录数据，业务名称唯一', '00006');
INSERT INTO `businesstype` VALUES (7, '业务7', '时间紧迫，来不及录数据，业务名称唯一', '00007');
INSERT INTO `businesstype` VALUES (8, '业务8', '时间紧迫，来不及录数据，业务名称唯一', '00008');
INSERT INTO `businesstype` VALUES (9, '业务9', '时间紧迫，来不及录数据，业务名称唯一', '00009');
INSERT INTO `businesstype` VALUES (10, '业务10', '时间紧迫，来不及录数据，业务名称唯一', '00010');
INSERT INTO `businesstype` VALUES (11, '业务11', '时间紧迫，来不及录数据，业务名称唯一', '00011');
INSERT INTO `businesstype` VALUES (12, '业务12', '时间紧迫，来不及录数据，业务名称唯一', '00012');
INSERT INTO `businesstype` VALUES (13, '业务13', '时间紧迫，来不及录数据，业务名称唯一', '00013');
INSERT INTO `businesstype` VALUES (14, '业务14', '时间紧迫，来不及录数据，业务名称唯一', '00014');
INSERT INTO `businesstype` VALUES (15, '业务15', '时间紧迫，来不及录数据，业务名称唯一', '00015');
INSERT INTO `businesstype` VALUES (16, '业务16', '时间紧迫，来不及录数据，业务名称唯一', '00016');
INSERT INTO `businesstype` VALUES (17, '业务17', '时间紧迫，来不及录数据，业务名称唯一', '00017');
INSERT INTO `businesstype` VALUES (18, '业务18', '时间紧迫，来不及录数据，业务名称唯一', '00018');
INSERT INTO `businesstype` VALUES (19, '业务19', '时间紧迫，来不及录数据，业务名称唯一', '00019');
INSERT INTO `businesstype` VALUES (20, '业务20', '时间紧迫，来不及录数据，业务名称唯一', '00020');
INSERT INTO `businesstype` VALUES (21, '业务21', '时间紧迫，来不及录数据，业务名称唯一', '00021');
INSERT INTO `businesstype` VALUES (22, '业务22', '时间紧迫，来不及录数据，业务名称唯一', '00022');
INSERT INTO `businesstype` VALUES (23, '业务23', '时间紧迫，来不及录数据，业务名称唯一', '00023');
INSERT INTO `businesstype` VALUES (24, '业务24', '时间紧迫，来不及录数据，业务名称唯一', '00024');
INSERT INTO `businesstype` VALUES (25, '业务25', '时间紧迫，来不及录数据，业务名称唯一', '00025');
INSERT INTO `businesstype` VALUES (26, '业务26', '时间紧迫，来不及录数据，业务名称唯一', '00026');
INSERT INTO `businesstype` VALUES (27, '业务27', '时间紧迫，来不及录数据，业务名称唯一', '00027');
INSERT INTO `businesstype` VALUES (28, '业务28', '时间紧迫，来不及录数据，业务名称唯一', '00028');
INSERT INTO `businesstype` VALUES (29, '业务29', '时间紧迫，来不及录数据，业务名称唯一', '00029');
INSERT INTO `businesstype` VALUES (30, '业务30', '时间紧迫，来不及录数据，业务名称唯一', '00030');
INSERT INTO `businesstype` VALUES (31, '业务31', '时间紧迫，来不及录数据，业务名称唯一', '00031');
INSERT INTO `businesstype` VALUES (32, '业务32', '时间紧迫，来不及录数据，业务名称唯一', '00032');
INSERT INTO `businesstype` VALUES (33, '业务33', '时间紧迫，来不及录数据，业务名称唯一', '00033');
INSERT INTO `businesstype` VALUES (34, '业务34', '时间紧迫，来不及录数据，业务名称唯一', '00034');
INSERT INTO `businesstype` VALUES (35, '业务35', '时间紧迫，来不及录数据，业务名称唯一', '00035');
INSERT INTO `businesstype` VALUES (36, '业务36', '时间紧迫，来不及录数据，业务名称唯一', '00036');
INSERT INTO `businesstype` VALUES (37, '业务37', '时间紧迫，来不及录数据，业务名称唯一', '00037');
INSERT INTO `businesstype` VALUES (38, '业务38', '时间紧迫，来不及录数据，业务名称唯一', '00038');
INSERT INTO `businesstype` VALUES (39, '业务39', '时间紧迫，来不及录数据，业务名称唯一', '00039');
INSERT INTO `businesstype` VALUES (40, '业务40', '时间紧迫，来不及录数据，业务名称唯一', '00040');

-- ----------------------------
-- Table structure for userdata
-- ----------------------------
DROP TABLE IF EXISTS `userdata`;
CREATE TABLE `userdata`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '账户',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '电话号码',
  `code` int NOT NULL COMMENT '验证码',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `ID_card_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '证件类型',
  `ID_card_num` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '证件号码',
  `postcode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮政编码',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地址',
  `security` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密保问题',
  `security_answer` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密保 答案',
  `upload_ID_Img` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否上传证件照片 1.已上传，0.未上传',
  PRIMARY KEY (`id`, `account`, `ID_card_num`) USING BTREE,
  INDEX `id`(`id`) USING BTREE,
  INDEX `account`(`account`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userdata
-- ----------------------------
INSERT INTO `userdata` VALUES (1, 'test1', '13367890324', 123456, 'test1', 'test1', '1', '42280119980708183X', '445016', '四川省成都市', '1加1等于几', '2', '1');
INSERT INTO `userdata` VALUES (2, 'test2', '15671345890', 222222, 'test2', 'test2', '1', '42280119970708183X', '445016', '四川省成都市', '1加1等于几', '2', '1');
INSERT INTO `userdata` VALUES (3, 'test3', '13456782345', 333333, 'test3', 'test3', '1', '42280119960708183X', '445016', '四川省成都市', '1加1等于几', '2', '0');
INSERT INTO `userdata` VALUES (4, 'test4', '15678902345', 444444, 'test4', 'test4', '1', '42280119950708183X', '445016', '四川省成都市', '1加1等于几', '2', '0');
INSERT INTO `userdata` VALUES (5, 'test5', '17890872346', 555555, 'test5', 'test5', '1', '42280119940708183X', '445016', '四川省成都市', '1加1等于几', '2', '0');
INSERT INTO `userdata` VALUES (6, 'admin', '15334011626', 666666, '666666', 'admin', '', '', '', '', '', '', '');

SET FOREIGN_KEY_CHECKS = 1;
