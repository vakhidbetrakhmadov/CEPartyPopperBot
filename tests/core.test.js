const core = require('../source/core');

test('produces 2x2 grid of 1s', () => {
    expect(
        core.grid(2, 2, () => 1)
    ).toEqual(
        [[1, 1], [1, 1]]
    );
});

test('produces 3x4 grid of years from 1994 to 2004', () => {
    expect(
        core.yearsGrid(1994, 2004, 3)
    ).toEqual([
        [1994, 1995, 1996],
        [1997, 1998, 1999],
        [2000, 2001, 2002],
        [2003, '', '']
    ]);
});

test('produces 3x4 grid of all months', () => { 
    expect(
        core.monthsGrid(3)
    ).toEqual([
        ['Jan', 'Feb', 'Mar'],
        ['Apr', 'May', 'Jun'],
        ['Jul', 'Aug', 'Sep'],
        ['Oct', 'Nov', 'Dec']
    ]);
});

test('', () => { 
    expect(
        core.daysGrid(1, 2020, 7)
    ).toEqual([
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19 , 20, 21],
        [22, 23, 24, 25, 26 , 27, 28],
        [29, 30, 31, '', '', '', '']
    ]);
});

test('returns 31 for the number of days in January 2020', () => { 
    expect(
        core.daysInMonth(1, 2020)
    ).toBe(31);
});

test('returns current year', () => { 
    expect(
        core.currentYear()
    ).toEqual(
        new Date().getFullYear()
    );
});
