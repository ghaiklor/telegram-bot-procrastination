"use strict";

const ANSWERS = require('../common/answers');

module.exports = bot => {
  bot.onText(/^[can, does, do, is, am, are, will].*\?$/i, message => {
    const fromId = message.from.id;
    bot.sendMessage(fromId, ANSWERS[Math.ceil(Math.random() * ANSWERS.length) - 1]);
  });
};
