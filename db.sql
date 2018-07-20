/*
	创建数据库
*/

CREATE DATABASE sec;

/*
	记录表 Record
*/

CREATE TABLE record (
id int auto_increment primary key, /* 编号 */
sip char(40) not null, /* 源IP */
sport int, /* 源端口 */
dip char(40) not null, /* 目标IP */
dport int , /* 目标端口 */
rtype char(20) not null, /* 违反的规则类型 */
idate TIMESTAMP default CURRENT_TIMESTAMP, /* 插入时间 */ 
keyword varchar(40)  /* 关键字 */
)character set utf8;

/*
	用户表 user
*/

CREATE TABLE user (
id int auto_increment primary key, /* 编号 */
username char(20) not null unique, /* 用户名 */
password char(40) not null ,/* 密码 */
reg_date TIMESTAMP  default CURRENT_TIMESTAMP /* 注册时间 */
)character set utf8;


/*
  黑名单表 balcklist
 */

CREATE TABLE blacklist(
id int auto_increment primary key, /* 编号 */
ip char(40) not null, /* 黑名单IP */
action CHAR(40) not null /* 黑名单IP对应的行为 */
)character set utf8;