CREATE DATABASE IF NOT EXISTS `emnify`;
USE `emnify`;


CREATE TABLE IF NOT EXISTS `user` (
   `user_id` INT NOT NULL
    PRIMARY KEY AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `hash` VARCHAR(255) NOT NULL,
  `organisation_id` INT DEFAULT 0,
  `first_name` VARCHAR(255),
  `last_name` VARCHAR(255),
  `is_admin` BOOLEAN DEFAULT 0
);


INSERT IGNORE INTO
  `user`(`user_id`, `email`, `hash`, `organisation_id`, `is_admin`)
  VALUES
    (1, 'user@org1.com', '123', 1, 0),
    (2, 'user@org2.com', '123', 2, 0),
    (3, 'user@org3.com', '123', 3, 0),
    (4, 'user@emnify.com', '123', 0, 1);


CREATE TABLE IF NOT EXISTS `tariff` (
   `tariff_id` INT NOT NULL
    PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `subscription_cost_per_sim` DECIMAL(14, 2) NOT NULL,
  `inclusive_volume` DECIMAL(14, 2) NOT NULL,
  `payg` BOOLEAN DEFAULT 0,
  `active_from` DATETIME NOT NULL,
  `active_to` DATETIME NULL
);

INSERT IGNORE INTO
  `tariff`(`tariff_id`, `name`, `subscription_cost_per_sim`, `inclusive_volume`, `payg`, `active_from`, `active_to`)
  VALUES
    (1, 'Inclusive Standard', 10, 50, 0, NOW(), null),
    (2, 'Inclusive Premium', 25, 200, 0, NOW(), null),
    (3, 'Pay As You Go', 0, 0, 1, NOW(), null);

CREATE TABLE IF NOT EXISTS `currency` (
  `currency_id` INT NOT NULL
    PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `rate` DECIMAL(14, 2) NOT NULL,
  `symbol` VARCHAR(255) NOT NULL
  );

INSERT IGNORE INTO
  `currency`(`currency_id`, `name`, `rate`, `symbol`)
  VALUES
    (1, 'EUR', 1, '€'),
    (2, 'GBP', 0.88, '£'),
    (3, 'USD', 1.07, '$');



CREATE TABLE IF NOT EXISTS `organisation` (
  `organisation_id` INT NOT NULL
    PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL,
  `currency_id` INT NOT NULL,
  `tariff_id` INT NOT NULL,
  `api-key` VARCHAR(250) NOT NULL,
  CONSTRAINT `organisation_currency_id`
    FOREIGN KEY (`currency_id`)
      REFERENCES `currency` (`currency_id`)
      ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `organisation_tariff_id`
    FOREIGN KEY (`tariff_id`)
      REFERENCES `tariff` (`tariff_id`)
      ON DELETE CASCADE ON UPDATE NO ACTION
  
  );

INSERT IGNORE INTO
  `organisation` (`organisation_id`, `name`, `currency_id`, `tariff_id`, `api-key`)
  VALUES
    (1, 'Awesome Trackers INC.', 1, 1, 'reallySecureKeyOrg1'),
    (2, 'Hudson Elevators', 2, 2, 'reallySecureKeyOrg2'),
    (3, 'Tree Water Systems', 3, 3, 'reallySecureKeyOrg3');


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
  `ratezone_id` INT NOT NULL DEFAULT 3,
  `amount_per_volume` DECIMAL(14, 6) NOT NULL DEFAULT 0,
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
    (3, 3, '1.99')
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