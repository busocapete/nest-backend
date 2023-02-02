USE `emnify`;

SELECT `cdr`.`ratezone_id`,
       SUM(`volume`)                              AS `total_volume`,
       SUM(`volume`) * `rate`.`amount_per_volume` AS `total_cost`
  FROM `cdr`
    JOIN `rate` ON `rate`.`ratezone_id` = `cdr`.`ratezone_id`
  WHERE `sim_id` IN (SELECT `sim_id` FROM `sim` WHERE `organisation_id` = 1)
  GROUP BY
    `cdr`.`ratezone_id`;
