const mysql = require('mysql');
const TelegramBot = require('node-telegram-bot-api');
const AppState = require('./AppState');
const { logMessage, logWarning, logError, hexString, sha256 } = require('./core');

// TODO: Graceful shutdown (see https://hackernoon.com/graceful-shutdown-in-nodejs-2f8f59d1c357)
// TODO: Add reset state to handle /start message
// TODO: Delete dateBuilder and inlineCallendarKeyboard when user leaves chanell 
// TODO: Create abstruction over DB with an explicit limited interface
// TODO: Migrate from MySQL to SQLite

const sqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rester1994'
});

sqlConnection.connect(function(err) {
    if (err) throw err;
    logMessage('Connected to MySql server');

    const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS ce_party_popper'
    sqlConnection.query(createDatabaseQuery, function (err) {
        if (err) throw err;
        logMessage('Database created');
    });

    const selectDatabaseQuery = 'USE ce_party_popper'
    sqlConnection.query(selectDatabaseQuery, function (err) {
        if (err) throw err;
        logMessage('Database selected');
    });

    const createTableIfNotExistsQuery = 
        'CREATE TABLE IF NOT EXISTS birthdates (' +
        'userId char(64) PRIMARY KEY, ' +
        'birthdate char(64)' +
        ')' 
    sqlConnection.query(createTableIfNotExistsQuery, function (err) {
        if (err) throw err;
        logMessage('Table created');
    });
});

const bot = new TelegramBot('1393897947:AAGjedaB1LhR9EjSBMY3v_XhHX0cWCr1vPQ', {polling: true});
const appState = new AppState();

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

    appState.resetAll();

    const inlineCallendarKeyboard = appState.getInlineCallendarKeyboard(message.from.id);

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

    const inlineCallendarKeyboard = appState.getInlineCallendarKeyboard(callbackQuery.from.id);

    appState.updateDateBuilder(
        callbackQuery.data,
        inlineCallendarKeyboard.currentState,
        callbackQuery.from.id
    );

    inlineCallendarKeyboard.selectKey(callbackQuery.data);

    updateBirthdateIfNeeded(callbackQuery.from.id);

    bot.editMessageText(
        inlineCallendarKeyboard.title(),
        {
            chat_id: callbackQuery.message.chat.id,
            message_id: callbackQuery.message.message_id,
            reply_markup: { 
                inline_keyboard: inlineCallendarKeyboard.currentKeyboard()
            }
        }
    ).catch((error) => logError(error));
});

bot.on("polling_error", (error) => logError(error));


function updateBirthdateIfNeeded(userId) { 
    const birthdate = appState.getDateBuilder(userId).buildDate();
    
    if (birthdate) { 
        updateBirthdate(userId, birthdate);
    }
};

function updateBirthdate(userId, birthdate) { 
    const userIdHash = sha256(userId);
    const birthdateHash = sha256(hexString(birthdate.getTime()));

    const insertOrUpdateQuery = 
        `INSERT INTO birthdates(userId, birthdate) VALUES ` + 
        `("${userIdHash}", "${birthdateHash}") ON DUPLICATE KEY ` + 
        `UPDATE userId = "${userIdHash}", birthdate = "${birthdateHash}"`;

    sqlConnection.query(insertOrUpdateQuery, function (err) {
        if (err) logError(err);
    });
};