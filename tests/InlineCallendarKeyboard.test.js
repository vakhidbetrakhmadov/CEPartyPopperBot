const InlineCallendarKeyboard = require('../source/InlineCallendarKeyboard');
const CallendarKeyboard = require('../source/CallendarKeyboard');
const { mockCurrentYearAndTest } = require('./core');
const { MONTHS_TO_NUMBER } = require('../source/constants');

// TODO: Add tests for title()

test('TODO', () => {
    expect(
        InlineCallendarKeyboard.inlineKeyboardButton('text')
    ).toEqual(
        {text: 'text', callback_data: 'text'}
    )
});

test('TODO', () => { 
    expect(
        InlineCallendarKeyboard.inlineKeyboardButton('text', 'data')
    ).toEqual(
        {text: 'text', callback_data: 'data'}
    )
});

test('TODO', () => { 
    expect(
        InlineCallendarKeyboard.inlineKeyboardButtons(['text'])
    ).toEqual(
        [{text: 'text', callback_data: 'text'}]
    )
});

test('TODO', () => { 
    expect(
        InlineCallendarKeyboard.inlineKeyboardButtons(['text'], (text) => 'data')
    ).toEqual(
        [{text: 'text', callback_data: 'data'}]
    )
});

test('TODO', () => { 
    expect(
        InlineCallendarKeyboard.inlineKeyboard([['text']])
    ).toEqual(
        [[{text: 'text', callback_data: 'text'}]]
    )
});


test('TODO', () => { 
    expect(
        InlineCallendarKeyboard.inlineKeyboard([['text']], (text) => 'data')
    ).toEqual(
        [[{text: 'text', callback_data: 'data'}]]
    )
});

mockCurrentYearAndTest('TODO', () => { 
    // given
    const inlineCallendarKeyboard = new InlineCallendarKeyboard(
        new CallendarKeyboard()
    );
    // when 
    
    // then
    expect(
        inlineCallendarKeyboard.currentKeyboard()
    ).toEqual(
        InlineCallendarKeyboard.inlineKeyboard(CallendarKeyboard.yearsKeyboard(2009, 2021))
    );
});

mockCurrentYearAndTest('TODO', () => { 
    // given
    const inlineCallendarKeyboard = new InlineCallendarKeyboard(
        new CallendarKeyboard()
    );
    // when 
    inlineCallendarKeyboard.selectKey(2020);
    // then
    expect(
        inlineCallendarKeyboard.currentKeyboard()
    ).toEqual(
        InlineCallendarKeyboard.inlineKeyboard(CallendarKeyboard.monthsKeyboard(2020), (text) => { 
            return MONTHS_TO_NUMBER[text] || text;
        })
    );
});

mockCurrentYearAndTest('TODO', () => { 
    // given
    const inlineCallendarKeyboard = new InlineCallendarKeyboard(
        new CallendarKeyboard()
    );
    inlineCallendarKeyboard.selectKey(2020);
    // when 
    inlineCallendarKeyboard.selectKey(1);
    // then
    expect(
        inlineCallendarKeyboard.currentKeyboard()
    ).toEqual(
        InlineCallendarKeyboard.inlineKeyboard(CallendarKeyboard.daysKeyboard(1, 2020))
    );
});

mockCurrentYearAndTest('TODO', () => { 
    // given
    const inlineCallendarKeyboard = new InlineCallendarKeyboard(
        new CallendarKeyboard()
    );
    inlineCallendarKeyboard.selectKey(2020);
    inlineCallendarKeyboard.selectKey(1);
    // when 
    inlineCallendarKeyboard.selectKey(1);
    // then
    expect(
        inlineCallendarKeyboard.currentKeyboard()
    ).toEqual(
        InlineCallendarKeyboard.inlineKeyboard(CallendarKeyboard.doneKeyboard(1, 1, 2020))
    );
});