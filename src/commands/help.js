"use strict";

const MESSAGES = require('../common/messages');

module.exports = bot => {
  bot.onText(/\/help/, message => {
    const fromId = message.from.id;

    bot.sendMessage(fromId, `
Ask me a question in the following format:

Can ... ?
Does ... ?
Do ... ?
Is ... ?
Am ... ?
Are ... ?
Will ... ?
`);
  });
};
