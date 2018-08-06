DROP SCHEMA db_blank;
DROP USER 'user_blank'@'localhost';

CREATE SCHEMA db_blank CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER 'user_blank'@'localhost' IDENTIFIED BY '111111';
GRANT ALL PRIVILEGES ON db_blank.* TO 'user_blank'@'localhost' WITH GRANT OPTION;

CREATE TABLE `db_blank`.`users` (
  `nid` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(128) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `role` VARCHAR(5) NOT NULL DEFAULT 'USER',
  `inserted` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `insertedby` INT(11) NOT NULL,
  `updateby` INT(12) NOT NULL,
  PRIMARY KEY (`nid`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC));
