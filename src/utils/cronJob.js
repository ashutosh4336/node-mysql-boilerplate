const cron = require('node-cron');

exports.cronJob = cron.schedule('* * * * *', async () => {
  try {
    console.log('running a task every minute');
  } catch (err) {
    console.error(err);
  }
});
