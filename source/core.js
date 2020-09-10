function logMessage(...messages) { 
    if (!LOGGER_ON) return;
    console.log('✉️  - Message - ✉️');
    console.log(...messages);
};

function logError(...messages) { 
    if (!LOGGER_ON) return;
    console.log('❌  - Error - ❌');
    console.log(...messages);
};


function logWarning(...messages) {
    if (!LOGGER_ON) return;
    console.log('⚠️  - Warning - ⚠️');
    console.log(...messages);
};

function grid(height, width, next) { 
    const grid = [];
    for (let i = 0; i < height; i++) { 
        grid.push([]);
        for(let j = 0; j < width; j++) { 
            grid[i].push(next(i, j));
        }
    }
    return grid;
};

function yearsGrid(from, to, width) {
    const height = Math.ceil((to - from) / width);
    return grid(height, width, () => {
        const text = from < to ? from : PLACEHOLDER_CHAR;
        from++;
        return text;
    });
};

function monthsGrid(width) { 
    const entries = Object.entries(NUMBER_TO_MONTHS);
    const height = Math.ceil(entries.length / width);
    const iterator = entries[Symbol.iterator]();
    return grid(height, width, () => {
        const next = iterator.next();
        const text = !next.done ? next.value[1] : PLACEHOLDER_CHAR;
        return text;
    });
};

function daysGrid(month, year, width) { 
    let from = 1;
    const to = daysInMonth(month, year) + 1;
    const height = Math.ceil((to - from) / width);
    return grid(height, width, () => {
        const text = from < to ? from : PLACEHOLDER_CHAR;
        from++;
        return text;
    });
}; 

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
};

function currentYear() { 
    return new Date().getFullYear();
};

const { 
    NUMBER_TO_MONTHS, 
    LOGGER_ON, 
    PLACEHOLDER_CHAR 
} = require('./constants');

module.exports = { 
    grid, 
    yearsGrid,
    monthsGrid, 
    daysGrid,
    daysInMonth,
    currentYear,
    logMessage,
    logError,
    logWarning
};