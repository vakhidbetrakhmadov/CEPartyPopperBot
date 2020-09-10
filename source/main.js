const TelegramBot = require('node-telegram-bot-api');
const InlineCallendarKeyboard = require('./InlineCallendarKeyboard');
const CallendarKeyboard = require('./CallendarKeyboard');
const { logMessage, logWarning, logError } = require('./core');

const token = 'TODO';
const bot = new TelegramBot(token, {polling: true});
const inlineCallendarKeyboard = new InlineCallendarKeyboard(new CallendarKeyboard());

bot.on('inline_query', (query) => { 
    logMessage(query);

    bot.answerInlineQuery(
        query.id,
        [], 
        { 
            switch_pm_text: 'Switch to PM',
            switch_pm_parameter: 'null' // leaving this field empty, results in an error ... 
        }
    ).catch(error =>  logError(error));
});

bot.onText(/\/start(.*)/, (message, match) => {
    logMessage(message);
    logMessage(match);

    bot.sendMessage(
        message.chat.id,
        inlineCallendarKeyboard.title(),
        {
            reply_markup: { 
                inline_keyboard: inlineCallendarKeyboard.currentKeyboard()
            }
        }
    ).catch((error) => logError(error));
});

bot.on('callback_query', (callbackQuery) => {
    logMessage(callbackQuery);

    inlineCallendarKeyboard.selectKey(callbackQuery.data);
    
    const options = {
      chat_id: callbackQuery.message.chat.id,
      message_id: callbackQuery.message.message_id,
      reply_markup: { 
        inline_keyboard: inlineCallendarKeyboard.currentKeyboard()
      }
    };
  
    bot.editMessageText(
        inlineCallendarKeyboard.title(),
        options
    ).catch((error) => logError(error));
});

bot.on("polling_error", (error) => logError(error));