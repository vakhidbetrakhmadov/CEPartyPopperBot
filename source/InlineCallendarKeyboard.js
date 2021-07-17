const CallendarKeyboard = require('./CallendarKeyboard');
const { MONTHS_TO_NUMBER } = require('./constants');

class InlineCallendarKeyboard { 

    // - Constructors
    constructor(callendarKeyboard) { 
        this.callendarKeyboard = callendarKeyboard;
    };

    // - Public statatic constants
    static get SELECT_YEAR() { return 'SELECT_YEAR'; };
    static get SELECT_MONTH() { return 'SELECT_MONTH'; };
    static get SELECT_DAY() { return 'SELECT_DAY'; };
    static get DONE() { return 'DONE'; };

    // - Public methods
    title() { 
        switch (this.callendarKeyboard.currentState) { 
            case CallendarKeyboard.SELECT_YEAR:
                return 'Select your birth year:';
            case CallendarKeyboard.SELECT_MONTH:
                return 'Select your birth month:';
            case CallendarKeyboard.SELECT_DAY:
                return 'Select your birth day:';
            case CallendarKeyboard.DONE:
                return 'Your birth date is:';
        }
    };

    get currentState() { 
        switch (this.callendarKeyboard.currentState) { 
            case CallendarKeyboard.SELECT_YEAR:
                return InlineCallendarKeyboard.SELECT_YEAR;
            case CallendarKeyboard.SELECT_MONTH:
                return InlineCallendarKeyboard.SELECT_MONTH;
            case CallendarKeyboard.SELECT_DAY:
                return InlineCallendarKeyboard.SELECT_DAY;
            case CallendarKeyboard.DONE:
                return InlineCallendarKeyboard.DONE;
        }
    }

    currentKeyboard() { 
        const currentKeyboard = this.callendarKeyboard.currentKeyboard();

        switch (this.callendarKeyboard.currentState) { 
            case CallendarKeyboard.SELECT_YEAR:
                return InlineCallendarKeyboard.inlineKeyboard(currentKeyboard);
            case CallendarKeyboard.SELECT_MONTH:
                return InlineCallendarKeyboard.inlineKeyboard(currentKeyboard, (text) => { 
                    return MONTHS_TO_NUMBER[text] || text;
                });
            case CallendarKeyboard.SELECT_DAY:
                return InlineCallendarKeyboard.inlineKeyboard(currentKeyboard);
            case CallendarKeyboard.DONE:
                return InlineCallendarKeyboard.inlineKeyboard(currentKeyboard);
        }
    };

    selectKey(key) { 
        this.callendarKeyboard.selectKey(key);
    };

    // - Public static methods
    static inlineKeyboard(keyboard, dataFn = (text) => text) { 
        return keyboard.map((row) => InlineCallendarKeyboard.inlineKeyboardButtons(row, dataFn));
    };

    static inlineKeyboardButtons(row, dataFn = (text) => text) { 
        return row.map((text) => { 
            return InlineCallendarKeyboard.inlineKeyboardButton(text, dataFn(text));
        });
    };

    static inlineKeyboardButton(text, data = text) { 
        return {text, callback_data: data};
    };
};

module.exports = InlineCallendarKeyboard;