const DateBuilder = require("../source/DateBuilder");

test('year returns 2020 after calling setYear(2020)', () => { 
    // given 
    const dateBuilder = new DateBuilder();
    // when 
    dateBuilder.setYear(2020);
    // then
    expect(dateBuilder.year).toBe(2020);
});

test('month returns 1 after calling setMonth(1)', () => { 
    // given 
    const dateBuilder = new DateBuilder();
    // when 
    dateBuilder.setMonth(1);
    // then
    expect(dateBuilder.month).toBe(1);
});

test('day returns 10 after calling setDay(10)', () => { 
    // given 
    const dateBuilder = new DateBuilder();
    // when 
    dateBuilder.setDay(10);
    // then
    expect(dateBuilder.day).toBe(10);
});

test('buildDate returns null on empty builder', () => { 
    expect(new DateBuilder().buildDate()).toBe(null);
});

test('buildDate returns null when year, month or day is not set', () => { 
    const testCases = [
        {input: [null, 1, 1], output: null},
        {input: [2020, null, 1], output: null},
        {input: [2020, 1, null], output: null}
    ];

    testCases.forEach((testCase) => { 
        // given 
        const dateBuilder = new DateBuilder();
        // when 
        const [year, month, day] = testCase.input;
        dateBuilder.setYear(year);
        dateBuilder.setMonth(month);
        dateBuilder.setDay(day);
        // then  
        expect(
            dateBuilder.buildDate()
        ).toBe(
            testCase.output
        );
    });
});

test('buildDate returns 2020-01-31 after calling setYear(2020), setMonth(1), setDay(1)', () => { 
    // given 
    const dateBuilder = new DateBuilder();
    // when 
    dateBuilder
        .setYear(2020)
        .setMonth(1)
        .setDay(1)
    // then
    expect(
        dateBuilder.buildDate()
    ).toEqual(
        new Date(2020, 1, 1)
    );
});