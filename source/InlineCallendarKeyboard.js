class InlineCallendarKeyboard { 

    // - Constructors
    constructor(callendarKeyboard) { 
        this.callendarKeyboard = callendarKeyboard;
    };

    // - Public methods
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

const CallendarKeyboard = require('./CallendarKeyboard');
const { MONTHS_TO_NUMBER } = require('./constants');