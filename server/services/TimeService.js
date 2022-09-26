class TimeService {
    getDateMonthYear() {
        const time = new Date()
        const timeData = time.getDate() < 10 ? "0" + time.getDate() : time.getDate()
        const timeMonth = time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1
        const timeYear = time.getFullYear()
        const date = timeData + "." + timeMonth + "." + timeYear
        return date
    }
}

module.exports = new TimeService()