const CallendarKeyboard = require('../source/CallendarKeyboard');

test('yearsKeyboard(1994, 2004) returns 3x6 keyboard of years with "<<", ">>" and "Reset" button', () => { 
    expect(CallendarKeyboard.yearsKeyboard(1994, 2004)).toEqual([
        [ 1994, 1995, 1996 ],
        [ 1997, 1998, 1999 ],
        [ 2000, 2001, 2002 ],
        [ 2003, '', '' ],
        [ '<<', '>>' ],
        [ 'Reset' ]
    ]);
});

test('monthKeyboard(2020) returns 3x6 keyboard of months with "2020" and "Reset" button', () => { 
    expect(CallendarKeyboard.monthsKeyboard(2020)).toEqual([
        [ 'Jan', 'Feb', 'Mar' ],
        [ 'Apr', 'May', 'Jun' ],
        [ 'Jul', 'Aug', 'Sep' ],
        [ 'Oct', 'Nov', 'Dec' ],
        [ 2020 ],
        [ 'Reset' ]
    ]); 
});

test('daysKeyboard(1, 2020) returns 7x7 keyboard of days with "Jan 2020" and "Reset" button', () => {
    expect(CallendarKeyboard.daysKeyboard(1, 2020)).toEqual([
        [ 1, 2, 3, 4, 5, 6, 7 ],
        [ 8,  9, 10, 11, 12, 13, 14 ],
        [ 15, 16, 17, 18, 19, 20, 21 ],
        [ 22, 23, 24, 25, 26, 27, 28 ],
        [ 29, 30, 31, '', '', '', '' ],
        [ 'Jan 2020' ],
        [ 'Reset' ]
    ]);
});

mockCurrentYearAndTest('TODO', () => { 
    expect(new CallendarKeyboard().currentKeyboard()).toEqual([ 
        [ 2009, 2010, 2011 ],
        [ 2012, 2013, 2014 ],
        [ 2015, 2016, 2017 ],
        [ 2018, 2019, 2020 ],
        [ '<<', '>>' ],
        [ 'Reset' ]
    ]);
});

mockCurrentYearAndTest('TODO', () => { 
    // given
    const callendarKeyboard = new CallendarKeyboard();
    // when
    callendarKeyboard.selectKey('<<');
    // then
    expect(callendarKeyboard.currentKeyboard()).toEqual([
        [ 1997, 1998, 1999 ],
        [ 2000, 2001, 2002 ],
        [ 2003, 2004, 2005 ],
        [ 2006, 2007, 2008 ],
        [ '<<', '>>' ],
        [ 'Reset' ]
    ]);
});

mockCurrentYearAndTest('TODO', () => { 
    // given
    const callendarKeyboard = new CallendarKeyboard();
    // when
    callendarKeyboard.selectKey('>>');
    // then
    expect(callendarKeyboard.currentKeyboard()).toEqual([
        [ 2021, 2022, 2023 ],
        [ 2024, 2025, 2026 ],
        [ 2027, 2028, 2029 ],
        [ 2030, 2031, 2032 ],
        [ '<<', '>>' ],
        [ 'Reset' ]
    ]);
});

mockCurrentYearAndTest('TODO', () => { 
    // given
    const callendarKeyboard = new CallendarKeyboard();
    callendarKeyboard.selectKey('<<');
    // when
    callendarKeyboard.selectKey('Reset');
    // then
    expect(callendarKeyboard.currentKeyboard()).toEqual([ 
        [ 2009, 2010, 2011 ],
        [ 2012, 2013, 2014 ],
        [ 2015, 2016, 2017 ],
        [ 2018, 2019, 2020 ],
        [ '<<', '>>' ],
        [ 'Reset' ]
    ]);
});

mockCurrentYearAndTest('TODO', () => { 
    // given 
    const callendarKeyboard = new CallendarKeyboard();
    // when 
    callendarKeyboard.selectKey(2020);
    // then 
    expect(callendarKeyboard.currentKeyboard()).toEqual([
        [ 'Jan', 'Feb', 'Mar' ],
        [ 'Apr', 'May', 'Jun' ],
        [ 'Jul', 'Aug', 'Sep' ],
        [ 'Oct', 'Nov', 'Dec' ],
        [ 2020 ],
        [ 'Reset' ]
    ]); 
});

mockCurrentYearAndTest('TODO', () => { 
    // given 
    const callendarKeyboard = new CallendarKeyboard();
    callendarKeyboard.selectKey(2020);
    // when 
    callendarKeyboard.selectKey(2020);
    // then 
    expect(callendarKeyboard.currentKeyboard()).toEqual([
        [ 'Jan', 'Feb', 'Mar' ],
        [ 'Apr', 'May', 'Jun' ],
        [ 'Jul', 'Aug', 'Sep' ],
        [ 'Oct', 'Nov', 'Dec' ],
        [ 2020 ],
        [ 'Reset' ]
    ]); 
});

mockCurrentYearAndTest('TODO', () => { 
    // given 
    const callendarKeyboard = new CallendarKeyboard();
    callendarKeyboard.selectKey(2020);
    // when 
    callendarKeyboard.selectKey('Reset');
    // then 
    expect(callendarKeyboard.currentKeyboard()).toEqual([
        [ 2009, 2010, 2011 ],
        [ 2012, 2013, 2014 ],
        [ 2015, 2016, 2017 ],
        [ 2018, 2019, 2020 ],
        [ '<<', '>>' ],
        [ 'Reset' ]
    ]); 
});

mockCurrentYearAndTest('TODO', () => { 
    // given 
    const callendarKeyboard = new CallendarKeyboard();
    callendarKeyboard.selectKey(2020);
    // when 
    callendarKeyboard.selectKey(1);
    // then 
    expect(callendarKeyboard.currentKeyboard()).toEqual([
        [ 1, 2, 3, 4, 5, 6, 7 ],
        [ 8,  9, 10, 11, 12, 13, 14 ],
        [ 15, 16, 17, 18, 19, 20, 21 ],
        [ 22, 23, 24, 25, 26, 27, 28 ],
        [ 29, 30, 31, '', '', '', '' ],
        [ 'Jan 2020' ],
        [ 'Reset' ]
    ]); 
});

mockCurrentYearAndTest('TODO', () => { 
    // given 
    const callendarKeyboard = new CallendarKeyboard();
    callendarKeyboard.selectKey(2020);
    callendarKeyboard.selectKey(1);
    // when 
    callendarKeyboard.selectKey('Jan 2020');
    // then 
    expect(callendarKeyboard.currentKeyboard()).toEqual([
        [ 1, 2, 3, 4, 5, 6, 7 ],
        [ 8,  9, 10, 11, 12, 13, 14 ],
        [ 15, 16, 17, 18, 19, 20, 21 ],
        [ 22, 23, 24, 25, 26, 27, 28 ],
        [ 29, 30, 31, '', '', '', '' ],
        [ 'Jan 2020' ],
        [ 'Reset' ]
    ]); 
});

mockCurrentYearAndTest('TODO', () => { 
    // given 
    const callendarKeyboard = new CallendarKeyboard();
    callendarKeyboard.selectKey(2020);
    callendarKeyboard.selectKey(1);
    // when 
    callendarKeyboard.selectKey('Reset');
    // then 
    expect(callendarKeyboard.currentKeyboard()).toEqual([
        [ 2009, 2010, 2011 ],
        [ 2012, 2013, 2014 ],
        [ 2015, 2016, 2017 ],
        [ 2018, 2019, 2020 ],
        [ '<<', '>>' ],
        [ 'Reset' ]
    ]); 
});

mockCurrentYearAndTest('TODO', () => { 
    // given 
    const callendarKeyboard = new CallendarKeyboard();
    callendarKeyboard.selectKey(2020);
    callendarKeyboard.selectKey(1);
    // when 
    callendarKeyboard.selectKey(1);
    // then 
    expect(callendarKeyboard.currentKeyboard()).toEqual([
        [ '1 Jan 2020' ],
        [ 'Done' ]
    ]); 
});

function mockCurrentYearAndTest(testName, testBody) { 
    jest.mock('../source/core');
    const core = require('../source/core');
    core.currentYear.mockImplementation(() => 2020);
    test(testName, testBody);
};