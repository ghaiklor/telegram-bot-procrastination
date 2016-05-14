"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const requireAll = require('require-all');
const TelegramBot = require('node-telegram-bot-api');
const BOT_COMMANDS = requireAll({dirname: `${__dirname}/commands`});
const app = express();

if (!process.env.TELEGRAM_BOT_TOKEN) throw new Error('You must provide TELEGRAM_BOT_TOKEN');
if (!process.env.PORT) throw new Error('You must provide PORT');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: process.env.NODE_ENV !== 'production'});
if (process.env.NODE_ENV === 'production') {
  bot.setWebHook(`https://telegram-bot-procrastination.herokuapp.com/${bot.token}`)
} else {
  bot.setWebHook('');
}

Object.keys(BOT_COMMANDS).forEach(command => BOT_COMMANDS[command](bot));

app.use(bodyParser.json());
app.get(`/`, (req, res) => res.redirect('http://telegram.me/Procrastination8BallBot'));
app.post(`/${process.env.TELEGRAM_BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
app.listen(process.env.PORT);
