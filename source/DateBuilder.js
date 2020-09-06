class DateBuilder { 

    // - Constructors
    constructor() { 
        this.year = null;
        this.month = null;
        this.day = null;
    };

    // - Public methods
    setYear(year) { 
        this.year = year;
        return this;
    };

    setMonth(month) { 
        this.month = month;
        return this;
    };

    setDay(day) { 
        this.day = day;
        return this;
    };

    // - Public methods
    buildDate() { 
        if(this.year == null  || this.month == null  || this.day == null) { return null; }
        return new Date(this.year, this.month, this.day);
    };
};

module.exports = DateBuilder;