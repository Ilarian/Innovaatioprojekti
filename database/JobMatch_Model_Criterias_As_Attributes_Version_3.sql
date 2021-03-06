-- MySQL Script generated by MySQL Workbench
-- Fri Nov 15 17:21:23 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema jobMatch
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `jobMatch` ;

-- -----------------------------------------------------
-- Schema jobMatch
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `jobMatch` DEFAULT CHARACTER SET utf8 ;
USE `jobMatch` ;

-- -----------------------------------------------------
-- Table `jobMatch`.`location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jobMatch`.`location` ;

CREATE TABLE IF NOT EXISTS `jobMatch`.`location` (
  `location_id` INT NOT NULL AUTO_INCREMENT,
  `location_name` VARCHAR(255) NULL,
  PRIMARY KEY (`location_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jobMatch`.`task`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jobMatch`.`task` ;

CREATE TABLE IF NOT EXISTS `jobMatch`.`task` (
  `task_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `description` VARCHAR(4095) NULL,
  `ajattelu_value` INT NULL,
  `fysiikka_value` INT NULL,
  `sosiaalisuus_value` INT NULL,
  `email` VARCHAR(255) NULL,
  `phone` VARCHAR(255) NULL,
  `link` VARCHAR(255) NULL,
  `date` DATE NULL,
  `location_id` INT NOT NULL,
  PRIMARY KEY (`task_id`),
  FOREIGN KEY (`location_id`)
    REFERENCES `jobMatch`.`location` (`location_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jobMatch`.`image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jobMatch`.`image` ;

CREATE TABLE IF NOT EXISTS `jobMatch`.`image` (
  `image_id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255) NULL,
  `task_id` INT NOT NULL,
  PRIMARY KEY (`image_id`),
  FOREIGN KEY (`task_id`)
    REFERENCES `jobMatch`.`task` (`task_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jobMatch`.`suggestion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jobMatch`.`suggestion` ;

CREATE TABLE IF NOT EXISTS `jobMatch`.`suggestion` (
  `suggestion_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `description` VARCHAR(4095) NULL,
  PRIMARY KEY (`suggestion_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jobMatch`.`video`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jobMatch`.`video` ;

CREATE TABLE IF NOT EXISTS `jobMatch`.`video` (
  `video_id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255) NULL,
  `task_id` INT NOT NULL,
  PRIMARY KEY (`video_id`),
  FOREIGN KEY (`task_id`)
    REFERENCES `jobMatch`.`task` (`task_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jobMatch`.`results`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jobMatch`.`results` ;

CREATE TABLE IF NOT EXISTS `jobMatch`.`results` (
  `results_id` INT NOT NULL AUTO_INCREMENT,
  `fysiikka_value` INT NULL,
  `ajattelu_value` INT NULL,
  `sosiaalisuus_value` INT NULL,
  PRIMARY KEY (`results_id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
