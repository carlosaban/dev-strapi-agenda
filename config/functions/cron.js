'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
 */

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */
  // '0 1 * * 1': () => {
  //
  // }

  '* * * * * *': () => {
    // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).
  
  strapi.log.fatal("fatal");
  strapi.log.error("error");
  strapi.log.warn("warn");
  strapi.log.info("info");
  strapi.log.trace("trace");
  },

  '0 55 18 * * *': () => {
    // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).
  console.log("evento programado**********s");
  
  },

  
};
