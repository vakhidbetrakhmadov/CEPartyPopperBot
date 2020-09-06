class CallendarKeyboard { 

    // - Constructors
    constructor() { 
        this._state = CallendarKeyboard._INITIAL_STATE;
    };

    // - Public methods
    currentKeyboard() { 
        switch (this._state.state) { 
            case CallendarKeyboard._SELECT_YEAR:
                return CallendarKeyboard.yearsKeyboard(
                    this._state.from,
                    this._state.to
                );
            case CallendarKeyboard._SELECT_MONTH: 
                return CallendarKeyboard.monthsKeyboard(
                    this._state.selectedYear
                );
            case CallendarKeyboard._SELECT_DAY: 
                return CallendarKeyboard.daysKeyboard(
                    this._state.selectedMonth,
                    this._state.selectedYear
                );
            case CallendarKeyboard._DONE:
                return CallendarKeyboard.doneKeyboard(
                    this._state.selectedDay,
                    this._state.selectedMonth,
                    this._state.selectedYear
                );
        }
    };

    selectKey(key) { 
        switch (this._state.state) { 
            case CallendarKeyboard._SELECT_YEAR:
                this._selectYear(key);
                break;
            case CallendarKeyboard._SELECT_MONTH: 
                this._selectMonth(key);
                break;
            case CallendarKeyboard._SELECT_DAY: 
                this._selectDay(key);
                break;
            case CallendarKeyboard._DONE:
                break;
        }
    };

    // - Public static methods
    static yearsKeyboard(from, to) {
        const keyboard = yearsGrid(from, to, 3);
        keyboard.push(
            ['<<', '>>'],
            ['Reset']
        );
        return keyboard;
    };

    static monthsKeyboard(year) {
        const keyboard = monthsGrid(3);
        keyboard.push(
            [year],
            ['Reset']
        );
        return keyboard;
    }

    static daysKeyboard(month, year) {
        const keyboard = daysGrid(month, year, 7);
        keyboard.push(
            [`${MONTHS[month]} ${year}`],
            ['Reset']
        );
        return keyboard;
    };

    static doneKeyboard(day, month, year) { 
        return [
            [`${day} ${MONTHS[month]} ${year}`],
            ['Done']
        ];
    };

    // - Private methods
    _selectYear(key) { 
        if (key === '>>') {
            this._state.from += CallendarKeyboard._MAX_YEARS_SPAN;
            this._state.to += CallendarKeyboard._MAX_YEARS_SPAN;
        } else if (key === '<<') {
            this._state.from -= CallendarKeyboard._MAX_YEARS_SPAN;
            this._state.to -= CallendarKeyboard._MAX_YEARS_SPAN;
        } else if (key === 'Reset') {
            this._state = CallendarKeyboard._INITIAL_STATE;
        } else {
            this._state = { 
                state: CallendarKeyboard._SELECT_MONTH,
                selectedYear: key
            };
        }
    };

    _selectMonth(key) { 
        if (key === this._state.selectedYear) { 
            // stay on the same state
        } else if (key === 'Reset') { 
            this._state = CallendarKeyboard._INITIAL_STATE;
        } else {
            this._state = {
                state: CallendarKeyboard._SELECT_DAY,
                selectedYear: this._state.selectedYear,
                selectedMonth: key
            };
        }
    };

    _selectDay(key) {
        if (key === `${MONTHS[this._state.selectedMonth]} ${this._state.selectedYear}`) { 
            // stay on the same state
        } else if (key === 'Reset') { 
            this._state = CallendarKeyboard._INITIAL_STATE;
        } else {
            this._state = { 
                state: CallendarKeyboard._DONE,
                selectedYear: this._state.selectedYear,
                selectedMonth: this._state.selectedMonth,
                selectedDay: key
            };
        }
    };

    // - Private static constants
    static get _INITIAL_STATE() { 
        const to = currentYear() + 1; 
        return { 
            state: this._SELECT_YEAR, 
            from: to - this._MAX_YEARS_SPAN, 
            to: to
        };
    };
    
    static get _SELECT_YEAR() { return 'SELECT_YEAR'; };
    static get _SELECT_MONTH() { return 'SELECT_MONTH'; };
    static get _SELECT_DAY() { return 'SELECT_DAY'; };
    static get _DONE() { return 'DONE'; };

    static get _MAX_YEARS_SPAN() { return 12; };
};

const { MONTHS } = require('./constants');
const { yearsGrid, monthsGrid, daysGrid, currentYear } = require('./core');

module.exports = CallendarKeyboard;