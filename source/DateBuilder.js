class DateBuilder { 

    // - Constructors
    constructor() { 
        this.year = null;
        this.month = null;
        this.day = null;
    };

    // - Public methods
    buildDate() { 
        if(this.year == null  || this.month == null  || this.day == null) { return null; }
        return new Date(this.year, this.month, this.day);
    };
};

module.exports = DateBuilder;