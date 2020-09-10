const CallendarKeyboard = require('../source/CallendarKeyboard');
const { mockCurrentYearAndTest } = require('./core');
const { PLACEHOLDER_CHAR } = require('../source/constants');

// TODO: Add tests for taps on PLACEHOLDER_CHAR

test('yearsKeyboard(1994, 2004) returns 3x6 keyboard of years with "<<", ">>" and "Reset" button', () => { 
    expect(
        CallendarKeyboard.yearsKeyboard(1994, 2004)
    ).toEqual([
        [ 1994, 1995, 1996 ],
        [ 1997, 1998, 1999 ],
        [ 2000, 2001, 2002 ],
        [ 2003, PLACEHOLDER_CHAR, PLACEHOLDER_CHAR ],
        [ '<<', '>>' ],
        [ 'Reset' ]
    ]);
});

test('monthKeyboard(2020) returns 3x6 keyboard of months with "2020" and "Reset" button', () => { 
    expect(
        CallendarKeyboard.monthsKeyboard(2020)
    ).toEqual([
        [ 'Jan', 'Feb', 'Mar' ],
        [ 'Apr', 'May', 'Jun' ],
        [ 'Jul', 'Aug', 'Sep' ],
        [ 'Oct', 'Nov', 'Dec' ],
        [ 2020 ],
        [ 'Reset' ]
    ]); 
});

test('daysKeyboard(1, 2020) returns 7x7 keyboard of days with "Jan 2020" and "Reset" button', () => {
    expect(
        CallendarKeyboard.daysKeyboard(1, 2020)
    ).toEqual([
        [ 1, 2, 3, 4, 5, 6, 7 ],
        [ 8,  9, 10, 11, 12, 13, 14 ],
        [ 15, 16, 17, 18, 19, 20, 21 ],
        [ 22, 23, 24, 25, 26, 27, 28 ],
        [ 29, 30, 31, PLACEHOLDER_CHAR, PLACEHOLDER_CHAR, PLACEHOLDER_CHAR, PLACEHOLDER_CHAR ],
        [ 'Jan 2020' ],
        [ 'Reset' ]
    ]);
});

test('TODO', () => { 
    expect(
        CallendarKeyboard.doneKeyboard(1, 1, 2020)
    ).toEqual([
        [ '1 Jan 2020' ],
        [ 'Done' ]
    ]);
});

mockCurrentYearAndTest('TODO', () => { 
    // given
    const callendarKeyboard = new CallendarKeyboard();
    // when 
    
    // then
    expect(
        callendarKeyboard.currentState
    ).toEqual(
        CallendarKeyboard.SELECT_YEAR
    );
    expect(
        callendarKeyboard.currentKeyboard()
    ).toEqual(
        CallendarKeyboard.yearsKeyboard(2009, 2021)
    );
});

mockCurrentYearAndTest('TODO', () => { 
    // given
    const callendarKeyboard = new CallendarKeyboard();
    // when
    callendarKeyboard.selectKey('<<');
    // then
    expect(
        callendarKeyboard.currentState
    ).toEqual(
        CallendarKeyboard.SELECT_YEAR
    );
    expect(
        callendarKeyboard.currentKeyboard()
    ).toEqual(
        CallendarKeyboard.yearsKeyboard(1997, 2009)
    );
});

mockCurrentYearAndTest('TODO', () => { 
    // given
    const callendarKeyboard = new CallendarKeyboard();
    // when
    callendarKeyboard.selectKey('>>');
    // then
    expect(
        callendarKeyboard.currentState
    ).toEqual(
        CallendarKeyboard.SELECT_YEAR
    );
    expect(
        callendarKeyboard.currentKeyboard()
    ).toEqual(
        CallendarKeyboard.yearsKeyboard(2021, 2033)
    );
});

mockCurrentYearAndTest('TODO', () => { 
    // given
    const callendarKeyboard = new CallendarKeyboard();
    callendarKeyboard.selectKey('<<');
    // when
    callendarKeyboard.selectKey('Reset');
    // then
    expect(
        callendarKeyboard.currentState
    ).toEqual(
        CallendarKeyboard.SELECT_YEAR
    );
    expect(
        callendarKeyboard.currentKeyboard()
    ).toEqual(
        CallendarKeyboard.yearsKeyboard(2009, 2021)
    );
});

mockCurrentYearAndTest('TODO', () => { 
    // given 
    const callendarKeyboard = new CallendarKeyboard();
    // when 
    callendarKeyboard.selectKey(2020);
    // then 
    expect(
        callendarKeyboard.currentState
    ).toEqual(
        CallendarKeyboard.SELECT_MONTH
    );
    expect(
        callendarKeyboard.currentKeyboard()
    ).toEqual(
        CallendarKeyboard.monthsKeyboard(2020)
    ); 
});

mockCurrentYearAndTest('TODO', () => { 
    // given 
    const callendarKeyboard = new CallendarKeyboard();
    callendarKeyboard.selectKey(2020);
    // when 
    callendarKeyboard.selectKey(2020);
    // then 
    expect(
        callendarKeyboard.currentState
    ).toEqual(
        CallendarKeyboard.SELECT_MONTH
    );
    expect(
        callendarKeyboard.currentKeyboard()
    ).toEqual(
        CallendarKeyboard.monthsKeyboard(2020)
    ); 
});

mockCurrentYearAndTest('TODO', () => { 
    // given 
    const callendarKeyboard = new CallendarKeyboard();
    callendarKeyboard.selectKey(2020);
    // when 
    callendarKeyboard.selectKey('Reset');
    // then 
    expect(
        callendarKeyboard.currentState
    ).toEqual(
        CallendarKeyboard.SELECT_YEAR
    );
    expect(
        callendarKeyboard.currentKeyboard()
    ).toEqual(
        CallendarKeyboard.yearsKeyboard(2009, 2021)
    ); 
});

mockCurrentYearAndTest('TODO', () => { 
    // given 
    const callendarKeyboard = new CallendarKeyboard();
    callendarKeyboard.selectKey(2020);
    // when 
    callendarKeyboard.selectKey(1);
    // then 
    expect(
        callendarKeyboard.currentState
    ).toEqual(
        CallendarKeyboard.SELECT_DAY
    );
    expect(
        callendarKeyboard.currentKeyboard()
    ).toEqual(
        CallendarKeyboard.daysKeyboard(1, 2020)
    ); 
});

mockCurrentYearAndTest('TODO', () => { 
    // given 
    const callendarKeyboard = new CallendarKeyboard();
    callendarKeyboard.selectKey(2020);
    callendarKeyboard.selectKey(1);
    // when 
    callendarKeyboard.selectKey('Jan 2020');
    // then 
    expect(
        callendarKeyboard.currentState
    ).toEqual(
        CallendarKeyboard.SELECT_DAY
    );
    expect(
        callendarKeyboard.currentKeyboard()
    ).toEqual(
        CallendarKeyboard.daysKeyboard(1, 2020)
    ); 
});

mockCurrentYearAndTest('TODO', () => { 
    // given 
    const callendarKeyboard = new CallendarKeyboard();
    callendarKeyboard.selectKey(2020);
    callendarKeyboard.selectKey(1);
    // when 
    callendarKeyboard.selectKey('Reset');
    // then 
    expect(
        callendarKeyboard.currentState
    ).toEqual(
        CallendarKeyboard.SELECT_YEAR
    );
    expect(
        callendarKeyboard.currentKeyboard()
    ).toEqual(
        CallendarKeyboard.yearsKeyboard(2009, 2021)
    ); 
});

mockCurrentYearAndTest('TODO', () => { 
    // given 
    const callendarKeyboard = new CallendarKeyboard();
    callendarKeyboard.selectKey(2020);
    callendarKeyboard.selectKey(1);
    // when 
    callendarKeyboard.selectKey(1);
    // then 
    expect(
        callendarKeyboard.currentState
    ).toEqual(
        CallendarKeyboard.DONE
    );
    expect(
        callendarKeyboard.currentKeyboard()
    ).toEqual(
        CallendarKeyboard.doneKeyboard(1, 1, 2020)
    ); 
});