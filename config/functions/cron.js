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

  '30 * * * * *': () => {
    // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).
  console.log("cada 10 segundos");
  console.log((new Date))
  },

  '0 55 18 * * *': () => {
    // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).
  console.log("evento programado**********s");
  console.log((new Date))
  },

  
};
