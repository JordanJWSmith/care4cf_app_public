var mysql = require('mysql');

var conn = mysql.createPool({
    host: 'care4cf-db.mysql.database.azure.com',
    user: 'ucabjjw@care4cf-db',
    password: 'Jordan2016Smith',
    database: 'care4cf',
    port: 3306,
    ssl: true,
    multipleStatements: true
}); 

// var sql = "SELECT * FROM users";
var createDB = `
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema care4cf
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema care4cf
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS \`care4cf\` DEFAULT CHARACTER SET latin1 ;
USE \`care4cf\` ;

-- -----------------------------------------------------
-- Table \`care4cf\`.\`accesstokens\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf\`.\`accesstokens\` (
  \`hashToken\` VARCHAR(32) NOT NULL,
  \`userID\` INT(11) NOT NULL,
  \`accessToken\` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (\`hashToken\`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table \`care4cf\`.\`activities\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf\`.\`activities\` (
  \`activityID\` INT(11) NOT NULL AUTO_INCREMENT,
  \`userID\` INT(11) NOT NULL,
  \`date\` DATE NOT NULL,
  \`scheduleID\` INT(11) NULL DEFAULT NULL,
  \`routineType\` INT(11) NOT NULL,
  \`productive\` BINARY(1) NULL DEFAULT NULL,
  \`mood\` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (\`activityID\`))
ENGINE = InnoDB
AUTO_INCREMENT = 74
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table \`care4cf\`.\`adjunctdescriptions\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf\`.\`adjunctdescriptions\` (
  \`adjunctID\` INT(11) NOT NULL AUTO_INCREMENT,
  \`adjunctTitle\` VARCHAR(100) NOT NULL,
  PRIMARY KEY (\`adjunctID\`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table \`care4cf\`.\`adjuncts\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf\`.\`adjuncts\` (
  \`scheduleID\` INT(11) NOT NULL,
  \`adjunctID\` INT(11) NOT NULL,
  \`adjunctTimeID\` INT(11) NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table \`care4cf\`.\`adjuncttimes\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf\`.\`adjuncttimes\` (
  \`adjunctTimeID\` INT(11) NOT NULL AUTO_INCREMENT,
  \`adjunctTime\` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (\`adjunctTimeID\`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table \`care4cf\`.\`admins\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf\`.\`admins\` (
  \`adminID\` INT(11) NOT NULL AUTO_INCREMENT,
  \`adminEmail\` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (\`adminID\`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table \`care4cf\`.\`durations\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf\`.\`durations\` (
  \`durationID\` INT(11) NOT NULL AUTO_INCREMENT,
  \`duration\` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (\`durationID\`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table \`care4cf\`.\`frequencies\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf\`.\`frequencies\` (
  \`frequencyID\` INT(11) NOT NULL AUTO_INCREMENT,
  \`frequency\` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (\`frequencyID\`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table \`care4cf\`.\`mood\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf\`.\`mood\` (
  \`moodID\` INT(11) NOT NULL AUTO_INCREMENT,
  \`mood\` VARCHAR(45) NOT NULL,
  PRIMARY KEY (\`moodID\`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table \`care4cf\`.\`noactivitydescriptions\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf\`.\`noactivitydescriptions\` (
  \`reasonID\` INT(11) NOT NULL AUTO_INCREMENT,
  \`description\` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (\`reasonID\`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table \`care4cf\`.\`noactivityreasons\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf\`.\`noactivityreasons\` (
  \`activityID\` INT(11) NOT NULL,
  \`reasonID\` INT(11) NOT NULL,
  PRIMARY KEY (\`activityID\`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table \`care4cf\`.\`normalschedules\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf\`.\`normalschedules\` (
  \`normalID\` INT(11) NOT NULL AUTO_INCREMENT,
  \`scheduleID\` INT(11) NOT NULL,
  \`userID\` INT(11) NOT NULL,
  \`dateAdded\` DATE NOT NULL,
  \`main\` BINARY(1) NULL DEFAULT NULL,
  PRIMARY KEY (\`normalID\`))
ENGINE = InnoDB
AUTO_INCREMENT = 31
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table \`care4cf\`.\`productive\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf\`.\`productive\` (
  \`productiveID\` INT(11) NOT NULL AUTO_INCREMENT,
  \`productive\` VARCHAR(45) NOT NULL,
  PRIMARY KEY (\`productiveID\`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table \`care4cf\`.\`routinetype\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf\`.\`routinetype\` (
  \`routineID\` INT(11) NOT NULL AUTO_INCREMENT,
  \`routine\` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (\`routineID\`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table \`care4cf\`.\`schedules\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf\`.\`schedules\` (
  \`scheduleID\` INT(11) NOT NULL AUTO_INCREMENT,
  \`duration\` VARCHAR(45) NULL DEFAULT NULL,
  \`frequencyID\` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (\`scheduleID\`))
ENGINE = InnoDB
AUTO_INCREMENT = 109
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table \`care4cf\`.\`subscriptions\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf\`.\`subscriptions\` (
  \`hashSubscription\` VARCHAR(45) NOT NULL,
  \`userID\` INT(11) NULL DEFAULT NULL,
  \`subscription\` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (\`hashSubscription\`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table \`care4cf\`.\`techdescriptions\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf\`.\`techdescriptions\` (
  \`techniqueID\` INT(11) NOT NULL AUTO_INCREMENT,
  \`techniqueType\` VARCHAR(45) NOT NULL,
  \`title\` VARCHAR(100) NULL DEFAULT NULL,
  \`subtitle\` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (\`techniqueID\`))
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table \`care4cf\`.\`techniques\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf\`.\`techniques\` (
  \`scheduleID\` INT(11) NULL DEFAULT NULL,
  \`techniqueID\` INT(11) NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table \`care4cf\`.\`users\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf\`.\`users\` (
  \`userID\` INT(11) NOT NULL,
  \`gamification\` SET('0', '1') NULL DEFAULT '1')
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

`

// uncomment the below to create the database schema

// conn.query(createDB, function (err, result) {
//     if (err) throw err;
//     // console.log('result: ', result);
//   });


module.exports = conn;