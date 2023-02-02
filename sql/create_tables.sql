CREATE DATABASE IF NOT EXISTS `emnify`;
USE `emnify`;


CREATE TABLE IF NOT EXISTS `organisation` (
  `organisation_id` INT NOT NULL
    PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL
  );

INSERT IGNORE INTO
  `organisation` (`organisation_id`, `name`)
  VALUES
    (1, 'Awesome Trackers INC.'),
    (2, 'Hudson Elevators'),
    (3, 'Tree Water Systems');


CREATE TABLE IF NOT EXISTS `sim` (
  `sim_id` INT NOT NULL
    PRIMARY KEY AUTO_INCREMENT,
  `organisation_id` INT NOT NULL,
  `iccid` VARCHAR(128) NOT NULL,
  `registered_at` DATETIME NOT NULL,
  CONSTRAINT `sim_organisation_id`
    FOREIGN KEY (`organisation_id`)
      REFERENCES `organisation` (`organisation_id`)
      ON DELETE CASCADE ON UPDATE NO ACTION
  );

INSERT IGNORE INTO
  `sim` (`sim_id`, `organisation_id`, `iccid`, `registered_at`)
  VALUES
    (1, 1, UUID(), NOW()),
    (2, 2, UUID(), NOW()),
    (3, 3, UUID(), NOW()),
    (4, 1, UUID(), NOW()),
    (5, 2, UUID(), NOW()),
    (6, 3, UUID(), NOW()),
    (7, 1, UUID(), NOW()),
    (8, 2, UUID(), NOW()),
    (9, 3, UUID(), NOW());

CREATE TABLE `ratezone` (
  `ratezone_id` INT NOT NULL
    PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL
  );

INSERT IGNORE INTO
  `ratezone`(`ratezone_id`, `name`)
  VALUES
    (1, 'US'),
    (2, 'APAC'),
    (3, 'Europe');

CREATE TABLE `rate` (
  `rate_id` INT NOT NULL
    PRIMARY KEY AUTO_INCREMENT,
  `ratezone_id` INT NOT NULL,
  `amount_per_volume` DECIMAL(14, 6) NOT NULL,
  CONSTRAINT `rate_ratezone_id`
    FOREIGN KEY (`ratezone_id`)
      REFERENCES `ratezone` (`ratezone_id`)
      ON DELETE CASCADE ON UPDATE NO ACTION
  );

INSERT IGNORE INTO
  `rate`(`rate_id`, `ratezone_id`, `amount_per_volume`)
  VALUES
    (1, 1, '0.99'),
    (2, 2, '0.89'),
    (3, 4, '1.99')
;

CREATE TABLE IF NOT EXISTS `cdr` (
  `cdr_id` INT
    PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `sim_id` INT NOT NULL,
  `ratezone_id` INT NOT NULL,
  `volume` DECIMAL(14, 6),
  `timestamp` DATETIME NOT NULL,
  CONSTRAINT `cdr_sim_id`
    FOREIGN KEY (`sim_id`)
      REFERENCES `sim` (`sim_id`)
      ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `cdr_ratezone_id`
    FOREIGN KEY (`ratezone_id`)
      REFERENCES `ratezone` (`ratezone_id`)
      ON DELETE CASCADE ON UPDATE NO ACTION
  );

INSERT INTO
  `cdr`(`sim_id`, `ratezone_id`, `volume`, `timestamp`)
  VALUES
    (1, 2, 24.24, NOW()),
    (2, 1, 2.57, NOW()),
    (3, 2, 0.2322, NOW()),
    (4, 3, 24.24, NOW()),
    (5, 1, 93.9, NOW()),
    (6, 3, 773.3, NOW()),
    (7, 2, 23.2, NOW()),
    (8, 1, 95.01, NOW()),
    (9, 1, 7.3, NOW()),

    (1, 2, 52.12, NOW()),
    (2, 3, 82.2, NOW()),
    (3, 3, 0.21, NOW()),
    (4, 2, 24.24, NOW()),
    (5, 2, 191.2, NOW()),
    (6, 3, 71.3, NOW()),
    (7, 1, 22.1, NOW()),
    (8, 1, 0.2, NOW()),
    (9, 2, 4.1, NOW())
;
