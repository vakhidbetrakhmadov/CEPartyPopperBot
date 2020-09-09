function mockCurrentYearAndTest(testName, testBody) { 
    jest.mock('../source/core');
    const core = require('../source/core');
    core.currentYear.mockImplementation(() => 2020);
    test(testName, testBody);
};

module.exports = { 
    mockCurrentYearAndTest
};