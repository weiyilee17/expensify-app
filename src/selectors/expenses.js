import moment from 'moment';

// Get visible expenses
export default (expenses, {text, sortBy, startDate, endDate}) => {
    // destructuring filter
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {    // sort by date, later first, recent later
            return b.createdAt - a.createdAt;
        }
        else {  // sort by amount, bigger first, less later
            return b.amount - a.amount;
        }
    });
};