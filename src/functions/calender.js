class Calender {
    static weekDays = ['日','月','火','水','木','金','土'];
    static weekNum = Calender.weekDays.length;

    constructor(year, month) {
        this.year = year;
        this.month = month;
    }

    checkLeap = () => {
        if (this.year % 4 !== 0) return false;
        if (this.year % 100 !== 0) return true;
        if (this.year % 400 !== 0) return false;
        return true;
    }

    getLastDate = () => {
        switch(this.month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            case 4:
            case 6:
            case 9:
            case 11:
                return 30;
            case 2:
                return this.checkLeap() ? 29 : 28;
            default:
                return null;
        }
    }

    getPrev = () => {
        if (this.month === 1) 
            return new Calender(this.year - 1, 12);
        else 
            return new Calender(this.year, this.month - 1);
    }

    getNext = () => {
        if (this.month === 12) 
            return new Calender(this.year + 1, 1);
        else 
            return new Calender(this.year, this.month + 1);
    }

    isToday = (year, month, date) => {
        const today = new Date();
        if (year !== today.getFullYear()) return false;
        if (month !== today.getMonth() + 1) return false;
        if (date !== today.getDate()) return false;
        return true;
    }

    get = () => {
        const firstDate = new Date(this.year, this.month - 1, 1);
        const lastDate = this.getLastDate();
        const prev = this.getPrev();
        const next = this.getNext();
        const prevLastDate = prev.getLastDate();

        const result = [];
        let date = 1;
        let week = 0;
        while (date <= lastDate) {
            result.push({
                index: week,
                dates: [],
            });
            for (let indexInWeek = 0; indexInWeek < Calender.weekNum; indexInWeek++) {
                if (date === 1 && indexInWeek < firstDate.getDay()) {
                    result[result.length - 1].dates.push({
                        year: prev.year,
                        month: prev.month,
                        value: prevLastDate - (firstDate.getDay() - indexInWeek) + 1,
                        isToday: this.isToday(prev.year, prev.month, date),
                        isThisMonth: false,
                    });
                }
                else if (date > lastDate) {
                    result[result.length - 1].dates.push({
                        year: next.year,
                        month: next.month,
                        value: date - lastDate,
                        isToday: this.isToday(next.year, next.month, date),
                        isThisMonth: false,
                    }
                    );
                    date++;
                }
                else {
                    result[result.length - 1].dates.push({
                        year: this.year,
                        month: this.month,
                        value: date,
                        isToday: this.isToday(this.year, this.month, date),
                        isThisMonth: true,
                    }
                    );
                    date++;
                }
            }
            week++;
        }

        return result;
    }
}

export default Calender;
