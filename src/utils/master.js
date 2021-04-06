// @ts-nocheck
const colors = require('colors');

// IMPORT DATA
const { MONTHDATA } = require('../data/MasterData');

exports.createMasterData = async () => {
  try {
    console.log(
      '👋️ ' + colors.green.bold('Checking and Creating Master Data...!!!')
    );
    console.log(MONTHDATA);
    console.log('📝️ ' + colors.cyan.bold(`Master Data Created...!!!`));
  } catch (err) {
    console.error(err);
  }
};
