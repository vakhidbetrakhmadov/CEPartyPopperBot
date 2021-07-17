const InlineCallendarKeyboard = require('./InlineCallendarKeyboard');
const CallendarKeyboard = require('./CallendarKeyboard');
const DateBuilder = require('./DateBuilder');

class AppState { 
    
    // - Constructors     
    constructor() { 
        this._inlineCallendarKeyboards = new Map();
        this._dateBuilders = new Map();    
    };

    // - Public methods
    getDateBuilder(userId) { 
        const dateBuilder = this._dateBuilders.get(userId) || new DateBuilder();
        this._dateBuilders.set(userId, dateBuilder);
        return dateBuilder;
    };
    
    deleteDateBuilder(userId) { 
        return this._dateBuilders.delete(userId);
    };
    
    getInlineCallendarKeyboard(userId) { 
        const inlineCallendarKeyboard = this._inlineCallendarKeyboards.get(userId) || new InlineCallendarKeyboard(new CallendarKeyboard());
        this._inlineCallendarKeyboards.set(userId, inlineCallendarKeyboard);
        return inlineCallendarKeyboard;
    };
    
    deleteInlineCallendarKeyboard(userId) { 
        this._inlineCallendarKeyboards.delete(userId);
    };
    
    updateDateBuilder(data, state, userId) { 
        const dateBuilder = this.getDateBuilder(userId);

        switch (state) { 
            case InlineCallendarKeyboard.SELECT_YEAR: 
                dateBuilder.setYear(data);
                break;
            case InlineCallendarKeyboard.SELECT_MONTH: 
                dateBuilder.setMonth(data - 1);
                break;
            case InlineCallendarKeyboard.SELECT_DAY: 
                dateBuilder.setDay(data);
                break;
            case InlineCallendarKeyboard.DONE:
                break;
        }
    };

    resetAll(userId) { 
        // TODO
    };
};

module.exports = AppState;