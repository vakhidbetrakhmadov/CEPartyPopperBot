const TelegramBot = require('node-telegram-bot-api');

const token = '1393897947:AAGjedaB1LhR9EjSBMY3v_XhHX0cWCr1vPQ';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message');
})