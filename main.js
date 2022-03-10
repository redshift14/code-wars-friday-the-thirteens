// my day global variable can be changed to obtain other result
// first index refers to the index of the day 0 --> 6, 5 is friday
// second index refers to the days, example: 1 --> 31.
const myDay = '513';

// check day function to use later in filter method
const checkDay = (day) => {
    return day = myDay;
}

// function to get all days in a given month
const getAllDaysInMonth = (year, month) => {
    let date = new Date(Date.UTC(year, month, 1));
    let days = [];
    while (date.getUTCMonth() === month) {
        days.push(new Date(date).getUTCDay()+ '' + new Date(date).getUTCDate());
        date.setUTCDate(date.getUTCDate() + 1);
    }
    // returns array of days
    return days;
}

// function to get all days in a given year
const getallDaysInYear = (year) => {
    let days = [];
    // looping throw all months
    for(let i=0; i < 12; i++) {
        // add all days of each month to all year days array
        days.push(getAllDaysInMonth(year, i));
    }
    return days;
}

// function to get indexes of months from the filtered array
const splitFilteredDays = (days) => {
    let myMonths = [];
    days.forEach(day => {
        myMonths.push(day.split(' ')[1])
    });
    return myMonths;
}

// function returns our result from our given year, and months indexes
const resultDates = (year, myMonths) => {
    let resultDates = [];
    const day = myDay.slice(-2);
    myMonths.forEach(month => {
        resultDates.push(`${parseInt(month)+1}/${day}/${year}`);
    });
    return resultDates;
}

const fridayTheThirteenthsOfOneYear = (year) => {
    // first get all the days in the given year
    let yearDaysByMonth = getallDaysInYear(new Date(year).getFullYear());
    // yearDaysByMonth will be an array of objects represents all days in a year
    // with each object represents a month
    let allDaysWithMonth = [];
    // here we get one big array that contains all days in the year
    // in a form like myDay global variable + its month
    for(let i=0; i<yearDaysByMonth.length; i++) {
        for(let j=0; j<yearDaysByMonth[i].length; j++) {
            allDaysWithMonth.push(yearDaysByMonth[i][j] +' '+ i);
        }
    }
    let filteredDays = [];
    // filter the all days array by myDay variable
    for(let i=0; i<allDaysWithMonth.length; i++) {
        if (allDaysWithMonth[i].includes(myDay)) {
            filteredDays.push(allDaysWithMonth[i]);
        }
    }
    // using splitFilteredArray function to get the indexes of the months
    // then using it in the result function 
    return resultDates(year, splitFilteredDays(filteredDays))
}

const fridayTheThirteenthsOfMoreThanYear = (start, end) => {
    let myResult = [];
    // repeting the same method as with one year function
    // but inside a loop for our range of years
    for (let i=parseInt(start); i<=parseInt(end); i++) {
        let yearDaysByMonth = getallDaysInYear(new Date(i.toString()).getFullYear());
        let allDaysWithMonth = [];
        for(let j=0; j<yearDaysByMonth.length; j++) {
            for(let k=0; k<yearDaysByMonth[j].length; k++) {
                allDaysWithMonth.push(yearDaysByMonth[j][k] +' '+ j + ' ' + i);
            }
        }
        let filteredDays = [];
        for(let i=0; i<allDaysWithMonth.length; i++) {
            if (allDaysWithMonth[i].includes(myDay)) {
                filteredDays.push(allDaysWithMonth[i]);
            }
        }
        myResult.push(resultDates(i, splitFilteredDays(filteredDays)))
    }
    return myResult;
}

const fridayTheThirteenths = (start, end) => {
    if (!end) {
        return fridayTheThirteenthsOfOneYear(start);
    }
    else {
        return fridayTheThirteenthsOfMoreThanYear(start, end);
    }
}

const main = () => {

    const errorMsg = document.querySelector('.error');
    const button = document.querySelector('button');
    const resultContainer = document.querySelector('.result');

    button.addEventListener('click', () => {

        const start = document.querySelector('#start-date').value;
        const end = document.querySelector('#end-date').value;
        
        let error = false;

        if (end === '') {
            if (start < 1000 || start > 2500) {
                error = true;
                errorMsg.style.opacity = '1';
                setTimeout(() => {
                    errorMsg.style.opacity = '0';
                }, 3000);
            }
            else {
                error = false;
            }
        }

        else {
            if (start < 1000 || start > 2500 || end < 1000 || end > 2500) {
                errorMsg.style.opacity = '1';
                error = true;
                setTimeout(() => {
                    errorMsg.style.opacity = '0';
                }, 3000);                
            }
            else if (start > end) {
                errorMsg.style.opacity = '1';
                error = true;
                setTimeout(() => {
                    errorMsg.style.opacity = '0';
                }, 3000);   
            }
            else {
                error = false;
            }
        } 
        if (!error) {
            let output = '';
            if(end === '') {
                fridayTheThirteenths(start).forEach(result => {
                    output += `
                        ${result},   
                    `;
                });
                resultContainer.innerHTML = 'Result: ' + output;
            }
            else {
                fridayTheThirteenths(start, end).forEach(result => {
                    output += `
                        ${result},  
                    `;
                });
                resultContainer.innerHTML = 'Result: ' + output;;
            }
        }
    })
}

main();

// i probably should have used other approuch, and i also think i need to use higher order array methods more
// like map and reduce, in the future i will use those methods and try to get the code cleaner.